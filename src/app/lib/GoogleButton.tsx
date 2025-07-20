import { useEffect, useRef } from "react";

interface ButtonGoogleCustomProps {
  onSuccess: (accessToken: string) => void;
  onError?: (error: Error) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (options: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string; error?: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

export default function ButtonGoogleCustom({
  onSuccess,
  onError,
}: ButtonGoogleCustomProps) {
  type InitTokenClientType = {
    requestAccessToken: () => void;
  };

  const tokenClientRef = useRef<InitTokenClientType | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google) {
        onError?.(new Error("Google Identity Services not loaded"));
        return;
      }

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        scope: "openid email profile",
        callback: (response) => {
          if (response.access_token) {
            onSuccess(response.access_token);
          } else {
            onError?.(new Error(response.error || "Access token error"));
          }
        },
      });

      tokenClientRef.current = tokenClient;
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess, onError]);

  const handleClick = () => {
    if (!tokenClientRef.current) {
      onError?.(new Error("Token client not ready"));
      return;
    }
    tokenClientRef.current.requestAccessToken();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 16,
        fontWeight: "bold",
      }}
    >
      Se connecter avec Google
    </button>
  );
}
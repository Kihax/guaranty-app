import { useEffect, useState } from "react";

interface ButtonGoogleCustomProps {
  onSuccess: (tokenId: string) => void;
  onError?: (error: Error) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          prompt: () => void;
          cancel: () => void;
          revoke: (token: string, callback: (done: boolean) => void) => void;
        };
      };
    };
  }
}

export default function ButtonGoogleCustom({
  onSuccess,
  onError,
}: ButtonGoogleCustomProps) {
  const [gisLoaded, setGisLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google) {
        onError?.(new Error("Google Identity Services script not loaded"));
        return;
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        callback: (response) => {
          if (response.credential) {
            onSuccess(response.credential);
          } else {
            onError?.(new Error("No credential received"));
          }
        },
      });

      setGisLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess, onError]);

  const handleClick = () => {
    if (!window.google || !gisLoaded) {
      onError?.(new Error("Google Identity Services not loaded"));
      return;
    }

    // Lance la popup de connexion Google manuellement
    window.google.accounts.id.prompt();
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
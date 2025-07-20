import { useEffect, useRef, FC } from "react";

interface ButtonGoogleProps {
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
          renderButton: (
            element: HTMLElement,
            options?: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              type?: "standard" | "icon" | "text" | "button";
              shape?: "rectangular" | "pill" | "circle" | "square";
              text?: "signin_with" | "signup_with" | "continue_with" | "signup_with";
              logo_alignment?: "left" | "center";
              width?: string | number;
              locale?: string;
            }
          ) => void;
          prompt?: () => void;
        };
      };
    };
  }
}

const GoogleButton: FC<ButtonGoogleProps> = ({ onSuccess, onError }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google || !divRef.current) {
        onError?.(new Error("Google Identity Services script not loaded or div missing"));
        return;
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        callback: (response) => {
          if (response.credential) {
            onSuccess(response.credential);
          } else {
            onError?.(new Error("No credential returned from Google"));
          }
        },
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
      });

      // Optionnel : afficher automatiquement la popup de connexion
      // window.google.accounts.id.prompt();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess, onError]);

  return <div ref={divRef} />;
};

export default GoogleButton;
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Minimal gapi type to satisfy TypeScript
type Gapi = {
  load: (api: string, callback: () => void) => void;
  auth2: {
    init: (params: { client_id: string; cookiepolicy: string }) => any;
  };
};

declare global {
  interface Window {
    gapi?: Gapi;
  }
}

export default function GoogleButton() {
  const [userName, setUserName] = useState<string | null>(null);
  const googleBtnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initGapi = () => {
      window.gapi?.load("auth2", () => {
        const auth2 = window.gapi?.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          cookiepolicy: "single_host_origin",
        });

        if (googleBtnRef.current && auth2) {
          auth2.attachClickHandler(
            googleBtnRef.current,
            {},
            (googleUser: {
                getBasicProfile: () => { getName: () => string };
                getAuthResponse: () => { id_token: string };
              }) => {
              // Cast googleUser to the expected type
              const profile = googleUser.getBasicProfile();
              const idToken = googleUser.getAuthResponse().id_token;

              setUserName(profile.getName());
              console.log("ID Token:", idToken);

              // 👉 Envoi au backend
              fetch("/api/login/google", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${idToken}`,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("✅ Backend response:", data);
                })
                .catch((err) => {
                  console.error("❌ Error sending token to backend:", err);
                });
            },
            (error: {error: string}) => {
              if (
                error?.error === "popup_closed_by_user"
              ) {
                console.warn("Popup fermée par l’utilisateur.");
              } else {
                console.error("Erreur Google Sign-In:", error);
              }
            }
          );
        }
      });
    };

    if (!window.gapi) {
      setIsLoading(true);
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        setIsLoading(false);
        initGapi();
      };
      script.onerror = () => {
        setIsLoading(false);
        console.error("Erreur lors du chargement de gapi");
      };
      document.body.appendChild(script);
    } else {
      initGapi();
    }
  }, []);

  return (
    <div>
      <button
        type="button"
        ref={googleBtnRef}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-indigo-600 focus:outline-2 focus:-outline-offset-2 sm:text-sm font-semibold"
      >
        <Image
          src="/icons8-google.svg"
          alt="Google Icon"
          width={24}
          height={24}
        />
        <span>{isLoading ? "Chargement..." : "Sign in with Google"}</span>
      </button>

      {userName && (
        <p className="mt-4 text-sm text-green-700">✅ Connecté en tant que <strong>{userName}</strong></p>
      )}
    </div>
  );
}
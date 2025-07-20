"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: {
      accounts?: {
        id?: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            context?: "signin" | "signup";
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };
    gapi?: Gapi;
  }
}

interface GapiAuth2 {
  init: (params: { client_id: string; cookiepolicy: string }) => unknown;
  attachClickHandler: (
    element: HTMLElement,
    options: object,
    onSuccess: (googleUser: unknown) => void,
    onFailure: (error: unknown) => void
  ) => void;
}

interface Gapi {
  load: (api: string, callback: () => void) => void;
  auth2: GapiAuth2;
}

declare const gapi: Gapi;


export default function GoogleButton() {
	const [userName, setUserName] = useState<string | null>(null);
  const googleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const start = () => {
      gapi.load("auth2", () => {
        const auth2 = gapi.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          cookiepolicy: "single_host_origin",
        }) as GapiAuth2;
        if (googleBtnRef.current) {
          auth2.attachClickHandler(
            googleBtnRef.current,
            {},
            (googleUser: unknown) => {
              // Type assertion for googleUser to access getBasicProfile
              const profile = (googleUser as { getBasicProfile: () => { getName: () => string } }).getBasicProfile();
              setUserName(profile.getName());
            },
            (error: unknown) => {
              console.error(JSON.stringify(error, null, 2));
            }
          );
        }
      });
    };

    // Charger le script gapi si ce n'est pas encore fait
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = start;
      document.body.appendChild(script);
    } else {
      start();
    }
  }, []);

  return (
    <button
      type="button"
      ref={googleBtnRef}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-indigo-600 focus:outline-2 focus:-outline-offset-2 sm:text-sm font-semibold"
    >
      <Image
        src="/icons8-google.svg"
        alt="Google Icon"
        width={24}
        height={24}
      />
      <span>Sign in with Google</span>
    </button>
  );
}
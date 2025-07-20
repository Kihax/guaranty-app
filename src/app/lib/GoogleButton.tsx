"use client";

import Image from "next/image";
import { useEffect } from "react";

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
  }
}

export default function GoogleButton() {
  useEffect(() => {
    if (!window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: (response: { credential: string }) => {
        console.log("ID Token", response.credential);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login-with-google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.credential }),
        });
      },
      auto_select: false,              // éviter sélection auto, pour test
      context: "signin",               // moment du prompt
      use_fedcm_for_prompt: true,     // important pour FedCM
    });

    // NE PAS appeler prompt() ici automatiquement,
    // laisse l'utilisateur cliquer sur le bouton
  }, []);

  const handleClick = () => {
    console.log("Google Button Clicked");
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt(); // va afficher le One Tap si possible
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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
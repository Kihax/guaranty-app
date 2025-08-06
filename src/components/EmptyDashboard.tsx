"use client";
import { useRouter } from "next/navigation";

export default function EmptyDashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-indigo-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Aucun produit enregistré
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Ajoutez votre premier produit pour commencer à gérer vos garanties.
      </p>
      <button
        onClick={() => router.push("/dashboard/add")}
        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Ajouter un produit
      </button>
    </div>
  );
}
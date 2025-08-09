"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function TicketViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const imageUrl = id ? `/api/image?id=${id}` : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Image du ticket */}
      <main className="flex flex-col items-center justify-center py-8 px-4">
        {imageUrl ? (
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-w-full max-h-[80vh] flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="Ticket"
              width={600}
              height={800}
              className="object-contain max-h-[75vh] max-w-full"
              unoptimized
            />
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Aucune image à afficher.</p>
        )}
        {/* Bouton retour en bas à droite */}
        <div className="fixed bottom-6 right-6 z-20">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Retour
          </button>
        </div>
      </main>
    </div>
  );
}


import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-3xl w-full flex flex-col items-center gap-8 py-12 px-4 sm:px-8 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl">
        <Image
          src="/logo.png"
          alt="Guaranty logo"
          width={90}
          height={90}
          className="mb-2 rounded-2xl shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300">Guaranty</h1>
        <p className="text-lg sm:text-xl text-center text-gray-700 dark:text-gray-200 max-w-2xl">
          Gardez vos factures en sécurité et ne perdez plus jamais vos remboursements ou votre argent !<br />
          Guaranty vous permet de stocker, retrouver et présenter facilement vos factures, que ce soit sur notre application mobile ou la web app.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.guaranty.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-md transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28" fill="currentColor"><path d="M325.3 234.3L104.7 28.6C98.2 22.7 89.1 21.7 81.7 26.2c-7.4 4.5-11.2 13.2-9.2 21.4l62.7 242.7 190.1-55.9zm-220.6 62.2l62.7 242.7c2 8.2 11.1 13.1 19.2 10.6 8.2-2.5 13.1-11.1 10.6-19.2l-62.7-242.7-29.8 8.6zm338.2-36.5l-190.1 55.9 220.6 62.2c8.2 2.3 16.7-2.4 19.2-10.6 2.5-8.2-2.4-16.7-10.6-19.2l-39.1-11.3zm-220.6-62.2l190.1-55.9-220.6-62.2c-8.2-2.3-16.7 2.4-19.2 10.6-2.5 8.2 2.4 16.7 10.6 19.2l39.1 11.3z"/></svg>
            Télécharger sur Google Play
          </a>
          <a
            href="/auth/login"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-md transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            Utiliser la Web App
          </a>
        </div>
        <ul className="mt-6 text-base text-gray-600 dark:text-gray-300 list-disc list-inside text-left max-w-xl mx-auto">
          <li>Stockez toutes vos factures en un seul endroit sécurisé</li>
          <li>Retrouvez vos justificatifs en quelques clics</li>
          <li>Présentez vos factures pour vos remboursements, même en cas de perte du papier</li>
          <li>Accessible partout : sur mobile (Android) et sur le web</li>
          <li>Protégez votre argent et vos droits de consommateur</li>
        </ul>
      </div>
      <footer className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Guaranty. Tous droits réservés.
      </footer>
    </div>
  );
}

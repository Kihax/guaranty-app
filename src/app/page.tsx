

import Image from "next/image";

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
    ),
    title: "Factures sécurisées",
    desc: "Stockez toutes vos factures dans un espace chiffré et sécurisé."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" /></svg>
    ),
    title: "Toujours accessible",
    desc: "Retrouvez vos justificatifs partout, sur mobile ou web."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
    ),
    title: "Remboursements facilités",
    desc: "Présentez vos factures en un clic pour vos garanties et remboursements."
  },
  {
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ),
    title: "Sérénité assurée",
    desc: "Protégez votre argent et vos droits de consommateur."
  },
];

const faqs = [
  {
    q: "Guaranty est-il gratuit ?",
    a: "Oui, l'utilisation de la web app est gratuite. Certaines fonctionnalités avancées peuvent être payantes sur mobile."
  },
  {
    q: "Comment mes données sont-elles protégées ?",
    a: "Vos factures sont chiffrées et stockées de façon sécurisée. Seul vous y avez accès."
  },
  {
    q: "Puis-je utiliser Guaranty sans installer l'application ?",
    a: "Oui, la web app est accessible depuis n'importe quel navigateur."
  },
  {
    q: "Comment récupérer mes factures si je change de téléphone ?",
    a: "Il suffit de vous reconnecter à votre compte sur n'importe quel appareil."
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="w-full px-4 sm:px-10 py-4 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 shadow-md fixed top-0 left-0 z-20 backdrop-blur">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Guaranty logo" width={40} height={40} className="rounded-xl" />
          <span className="font-bold text-xl text-indigo-700 dark:text-indigo-300">Guaranty</span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Fonctionnalités</a>
          <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
          <a href="/auth/login" className="hover:text-indigo-600 transition">Connexion</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 pt-32 pb-16 px-4 sm:px-10">
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 dark:text-indigo-200 text-center md:text-left leading-tight">
            Gardez vos factures<br className="hidden sm:block" /> en sécurité.<br />
            <span className="text-indigo-500 dark:text-indigo-400">Ne perdez plus jamais vos remboursements !</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 text-center md:text-left max-w-xl">
            Guaranty centralise et protège vos factures pour que vous puissiez les retrouver et les présenter à tout moment, sur mobile ou web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
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
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image src="/login_big_image.jpg" alt="Illustration factures" width={420} height={420} className="rounded-3xl shadow-2xl object-cover max-h-[340px] w-auto" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-10 bg-white/80 dark:bg-gray-900/80">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-10">Fonctionnalités clés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-indigo-50 dark:bg-gray-800 shadow hover:scale-105 transition-transform">
              {f.icon}
              <h3 className="font-semibold text-lg text-indigo-800 dark:text-indigo-200">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-10 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-10">FAQ</h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-gray-900 shadow p-6">
              <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-200 mb-2">{faq.q}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm bg-white/80 dark:bg-gray-900/80 mt-auto">
        &copy; {new Date().getFullYear()} Guaranty. Tous droits réservés.
      </footer>
    </div>
  );
}

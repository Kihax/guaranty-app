

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


  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Main">
          <div className="flex items-center gap-2">
            <Image src="/logo_black.png" alt="Guaranty logo" width={40} height={40} className="rounded-xl" />
            <span className="font-bold text-xl text-indigo-700 dark:text-indigo-300">Guaranty</span>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:text-indigo-600">Fonctionnalités</a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:text-indigo-600">Tarifs</a>
            <a href="#faq" className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:text-indigo-600">FAQ</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/auth/login" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-800">Connexion <span aria-hidden="true">→</span></a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative isolate pt-24 sm:pt-32 lg:pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
              Gardez vos factures en sécurité.<br />
              <span className="text-indigo-600 dark:text-indigo-400">Ne perdez plus jamais vos remboursements !</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Guaranty centralise et protège vos factures pour que vous puissiez les retrouver et les présenter à tout moment, sur mobile ou web.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.guaranty.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-700 transition"
              >
                Télécharger sur Google Play
              </a>
              <a
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                Utiliser la Web App
              </a>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <Image src="/dashboard.png" alt="Illustration factures" width={520} height={400} className="rounded-3xl shadow-2xl object-cover max-h-[340px] w-auto" />
          </div>
        </div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-200 via-white to-blue-200 opacity-30 dark:from-indigo-900 dark:via-gray-900 dark:to-blue-900" style={{ clipPath: 'polygon(74.8% 44.1%, 100% 61.6%, 97.2% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.8% 44.1%)' }} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">Fonctionnalités</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Tout ce dont vous avez besoin pour vos factures</p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Guaranty simplifie la gestion, la sécurité et la présentation de vos justificatifs.</p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-indigo-50 dark:bg-gray-800 shadow hover:scale-105 transition-transform">
                {f.icon}
                <h3 className="font-semibold text-lg text-indigo-800 dark:text-indigo-200">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">Tarifs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Des offres simples et transparentes</p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">La web app est gratuite, l&apos;application mobile propose des options avancées pour les utilisateurs exigeants.</p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Gratuit */}
            <div className="flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 p-8">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Web App</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gratuit</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Accès illimité à toutes les fonctionnalités de base depuis votre navigateur.</p>
              <ul className="flex-1 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
                <li>✔️ Stockage sécurisé</li>
                <li>✔️ Accès multi-appareils</li>
                <li>✔️ Export PDF</li>
                <li>✔️ Support email</li>
              </ul>
              <a href="/auth/login" className="mt-auto w-full inline-block text-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition">Commencer</a>
            </div>
            {/* Mobile Essentiel */}
            <div className="flex flex-col rounded-3xl bg-indigo-50 dark:bg-indigo-900 shadow-2xl ring-2 ring-indigo-600 dark:ring-indigo-400 p-8 scale-105 z-10">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-200 mb-2">Mobile Essentiel</h3>
              <p className="text-4xl font-bold text-indigo-700 dark:text-indigo-200 mb-2">2,99€<span className="text-base font-normal text-gray-600 dark:text-gray-300">/mois</span></p>
              <p className="text-gray-700 dark:text-gray-200 mb-6">Toutes les fonctionnalités de la web app + accès mobile natif et notifications.</p>
              <ul className="flex-1 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
                <li>✔️ Application Android</li>
                <li>✔️ Notifications</li>
                <li>✔️ Scan de factures</li>
                <li>✔️ Support prioritaire</li>
              </ul>
              <a href="https://play.google.com/store/apps/details?id=com.guaranty.app" target="_blank" rel="noopener noreferrer" className="mt-auto w-full inline-block text-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-2 transition">Télécharger</a>
              <div className="bg-indigo-600 dark:bg-indigo-400 text-white dark:text-indigo-900 text-xs font-bold text-center py-2 tracking-wide mt-6 rounded-lg">Le plus populaire</div>
            </div>
            {/* Mobile Premium */}
            <div className="flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 p-8">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Mobile Premium</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">5,99€<span className="text-base font-normal text-gray-600 dark:text-gray-300">/mois</span></p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Pour les utilisateurs intensifs : stockage augmenté, assistance VIP, fonctionnalités exclusives.</p>
              <ul className="flex-1 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
                <li>✔️ Tout Mobile Essentiel</li>
                <li>✔️ Stockage illimité</li>
                <li>✔️ Assistance VIP</li>
                <li>✔️ Fonctionnalités à venir</li>
              </ul>
              <a href="https://play.google.com/store/apps/details?id=com.guaranty.app" target="_blank" rel="noopener noreferrer" className="mt-auto w-full inline-block text-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition">Choisir Premium</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Questions fréquentes</p>
          </div>
          <div className="mt-16 max-w-3xl mx-auto flex flex-col gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-indigo-50 dark:bg-gray-800 shadow p-6">
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-200 mb-2">{faq.q}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm bg-white dark:bg-gray-900 mt-auto border-t border-gray-100 dark:border-gray-800">
        &copy; {new Date().getFullYear()} Guaranty. Tous droits réservés.
      </footer>
    </div>
  );
}

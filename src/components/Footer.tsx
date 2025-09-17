import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Seção de entrega e custos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l3-3-3-3" />
              </svg>
            </div>
            <h3 className="font-medium text-black mb-2">Schnelle Lieferung</h3>
            <p className="text-gray-600 text-sm">
              1-3 Werktage Lieferzeit
            </p>
            <p className="text-gray-600 text-sm">
              ab 29€ versandkostenfrei
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 className="font-medium text-black mb-2">Versandkostenfrei</h3>
            <p className="text-gray-600 text-sm">
              ab 29€ Bestellwert
            </p>
            <p className="text-gray-600 text-sm">
              in 24.056 Filialen abholbar
            </p>
          </div>
        </div>

        {/* Links principais */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-medium text-black mb-4">Kundenservice</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Kontakt</a></li>
              <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Lieferung & Versand</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Rückgabe & Umtausch</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-4">Über Douglas</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Unternehmen</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Karriere</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Presse</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Nachhaltigkeit</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-4">Kategorien</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Parfüm</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Make-up</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Hautpflege</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Haarpflege</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-4">Mein Konto</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Anmelden</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Registrieren</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Bestellungen</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Wunschliste</a></li>
            </ul>
          </div>
        </div>

        {/* Redes sociais e métodos de pagamento */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-medium text-black mb-2">Folge uns</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-black mb-2">Zahlungsmethoden</h4>
              <div className="flex space-x-2">
                <span className="text-sm bg-white px-2 py-1 border border-gray-300 rounded">VISA</span>
                <span className="text-sm bg-white px-2 py-1 border border-gray-300 rounded">MC</span>
                <span className="text-sm bg-white px-2 py-1 border border-gray-300 rounded">PayPal</span>
                <span className="text-sm bg-white px-2 py-1 border border-gray-300 rounded">Klarna</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 mt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Douglas. Alle Rechte vorbehalten. | 
            <a href="#" className="hover:text-black transition-colors ml-1">Datenschutz</a> | 
            <a href="#" className="hover:text-black transition-colors ml-1">AGB</a> | 
            <a href="#" className="hover:text-black transition-colors ml-1">Impressum</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
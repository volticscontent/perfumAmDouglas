import React from 'react';

const PerfumeInfo = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Seção sobre tipos de notas */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-black uppercase mb-8 text-center">
            WAS UNTERSCHEIDET EAU DE TOILETTE, EAU DE PARFUM UND CO.?
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Der Unterschied liegt in der Duftöl-Konzentration. Diese bestimmt die Intensität und die Haltbarkeit des Duftes. Hier ist der Überblick über den Duftölgehalt in verschiedenen Parfümtypen:
          </p>    
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-black mb-2">Extrait de Parfum</h3>
              <p className="text-gray-600">15-40%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-black mb-2">Eau de Parfum (EdP)</h3>
              <p className="text-gray-600">8-15%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-black mb-2">Eau de Toilette (EdT)</h3>
              <p className="text-gray-600">6-8%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-black mb-2">Eau de Cologne</h3>
              <p className="text-gray-600">3-6%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-black mb-2">Eau de Fraîche</h3>
              <p className="text-gray-600">&lt; 3%</p>
            </div>
        </div>

        {/* Seção sobre durabilidade */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-black uppercase mb-8 text-center">
            WIE HÄLT PARFÜM AM LÄNGSTEN?
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Wie intensiv und langanhaltend der Duft ist, kannst du neben der Wahl der Duftkonzentration dadurch beeinflussen, wo du das Parfüm aufsprühst: Am schnellsten und intensivsten entfalten sich Düfte generell an Stellen, an denen die Haut gut durchblutet und warm ist wie an Hals, Nacken und Dekolleté oder an Armbeuge und Handgelenk. An kühleren Körperregionen wie den Ohrläppchen sind Düfte dagegen besonders langanhaltend.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-gray-700">
              <strong>Tipp:</strong> Parfüm nicht verreiben – die Reibung erzeugt Hitze und verändert dabei den Duft. Lass das Parfüm an der Luft trocknen oder klopfe es nur leicht ein.
            </p>
          </div>
        </div>

        {/* Seção sobre pirâmide olfativa */}
        <div>
          <h2 className="text-2xl font-medium text-black uppercase mb-8 text-center">
            PARFÜM ONLINE KAUFEN - MITHILFE DER DUFTPYRAMIDE
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Ein hochwertiges Parfüm wird mit der gleichen Präzision wie ein kostbares Musikstück komponiert. Es besteht üblicherweise aus 150 bis 250 verschiedenen Komponenten, die gemeinsam die Duftnoten – Kopf, Herz und Basis – formen, welche die sogenannte Duftpyramide aufbauen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PerfumeInfo;
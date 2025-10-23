'use client'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-gray-600 mb-8">
          Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zurück zur Startseite
        </button>
      </div>
    </div>
  )
}
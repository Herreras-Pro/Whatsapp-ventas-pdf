import React, { useState, useEffect, Suspense } from 'react';
import './index.css';

// Lazy loading the pages for Code Splitting (PageSpeed Optimization)
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const GraciasPage = React.lazy(() => import('./pages/GraciasPage'));
const DownsellPage = React.lazy(() => import('./pages/DownsellPage'));
const AccesoBasicoPage = React.lazy(() => import('./pages/AccesoBasicoPage'));
const AccesoPremiumPage = React.lazy(() => import('./pages/AccesoPremiumPage'));
const LegalPage = React.lazy(() => import('./pages/LegalPage'));

// Fallback loader while downloading the page chunk
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f9fafb' }}>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
      <p style={{ color: '#6B7280', fontWeight: '500' }}>Cargando la Bóveda...</p>
    </div>
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {currentPath === '/gracias' ? (
        <GraciasPage />
      ) : currentPath === '/downsell' ? (
        <DownsellPage />
      ) : currentPath === '/acceso-basico' ? (
        <AccesoBasicoPage />
      ) : currentPath === '/acceso-premium' ? (
        <AccesoPremiumPage />
      ) : currentPath === '/terminos' ? (
        <LegalPage />
      ) : (
        <LandingPage />
      )}
    </Suspense>
  );
}

export default App;

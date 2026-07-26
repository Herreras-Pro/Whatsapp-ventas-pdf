import React, { useEffect } from 'react';

export default function AccesoBasicoPage() {
  const driveFolderLink = "https://drive.google.com/drive/folders/1PztWxFEP34uqBJe2gamIIwiEaJMU1jiA?usp=sharing";
  
  useEffect(() => {
    if (!window.location.search.includes("auth=qp_secure")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="access-page">
      <div className="container">
        <div className="celebration-icon">🎉</div>
        <h1>¡Felicidades! Compra Confirmada</h1>
        <p className="subtitle">Ya eres miembro oficial de la Bóveda Maestra de Cierre por WhatsApp.</p>
        
        <div className="access-box">
          <h2>Tu Compra Incluye:</h2>
          <ul className="check-list">
            <li>✅ Acceso Vitalicio a la Bóveda Maestra de Guiones</li>
            <li>✅ Actualizaciones Mensuales Garantizadas</li>
            <li>✅ Bonos de Audios y Prompts de IA</li>
          </ul>
          
          <div className="cta-wrapper">
            <a href={driveFolderLink} target="_blank" rel="noopener noreferrer" className="cta-button">
              ACCEDER A MI BÓVEDA EN DRIVE
            </a>
          </div>
          <p className="guarantee-text">Guarda este enlace en tus favoritos para acceder al contenido siempre que lo necesites.</p>
        </div>
      </div>
    </div>
  );
}

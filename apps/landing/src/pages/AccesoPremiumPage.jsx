import React, { useEffect } from 'react';
import { trackTikTokEvent, trackGoogleAdsEvent } from '../utils';

export default function AccesoPremiumPage() {
  const driveFolderLink = "https://drive.google.com/drive/folders/1PztWxFEP34uqBJe2gamIIwiEaJMU1jiA?usp=sharing";
  const upsellFileLink = "https://drive.google.com/file/d/1EWs1vPgvuq-2v_wO2BIZ1Zskal6UyTPa/view?usp=sharing";
  
  useEffect(() => {
    if (window.location.search.length < 5) {
      window.location.href = "/";
    } else {
      trackTikTokEvent('CompletePayment', {
        value: 67.00,
        currency: 'PEN',
        content_name: 'Pack 50 Plantillas Anuncios VIP'
      });
      trackGoogleAdsEvent('purchase', {
        transaction_id: 'QP_VIP_' + Date.now(),
        value: 67.00,
        currency: 'PEN',
        items: [{ item_name: 'Pack 50 Plantillas Anuncios VIP' }]
      });
    }
  }, []);

  return (
    <div className="access-page premium-access">
      <div className="container">
        <div className="celebration-icon">🏆</div>
        <h1>¡Felicidades Miembro VIP!</h1>
        <p className="subtitle">Has asegurado tu máquina completa de ventas (Guiones + Tráfico).</p>
        
        <div className="access-box">
          <h2>Tu Arsenal Completo:</h2>
          
          <div className="product-access">
            <h3>1. La Bóveda Maestra de Guiones (Pago Único)</h3>
            <p>Aquí encontrarás tus guiones de WhatsApp y actualizaciones.</p>
            <a href={driveFolderLink} target="_blank" rel="noopener noreferrer" className="cta-button outline-btn">
              ACCEDER A LA BÓVEDA (DRIVE)
            </a>
          </div>

          <div className="product-access">
            <h3>2. Pack de 50 Plantillas Meta Ads (Pago Único)</h3>
            <p>Tus anuncios copy-paste para generar tráfico calificado.</p>
            <a href={upsellFileLink} target="_blank" rel="noopener noreferrer" className="cta-button upsell-btn">
              DESCARGAR PACK DE ANUNCIOS (PDF)
            </a>
          </div>
          
          <p className="guarantee-text" style={{marginTop: '2rem'}}>Asegúrate de guardar ambos enlaces para no perder tu acceso.</p>
        </div>
      </div>
    </div>
  );
}

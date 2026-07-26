import React, { useEffect } from 'react';
import { MP_LINKS, trackGoogleAdsEvent } from '../utils';

export default function GraciasPage() {
  useEffect(() => {
    if (window.location.search.length < 5) {
      window.location.href = "/";
    } else {
      trackGoogleAdsEvent('purchase', {
        transaction_id: 'QP_BASE_' + Date.now(),
        value: 29.00,
        currency: 'PEN',
        items: [{ item_name: 'Boveda Maestra de Cierres' }]
      });
    }
  }, []);

  const handleUpsellPurchase = (e) => {
    e.preventDefault();
    trackGoogleAdsEvent('begin_checkout', {
      value: 67.00,
      currency: 'PEN',
      items: [{ item_name: 'Pack 50 Plantillas Meta Ads' }]
    });
    window.location.href = MP_LINKS.UPSELL;
  };

  return (
    <div className="upsell-page">
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p className="progress-text">Paso 1 de 2: ¡Tu orden de la Bóveda ha sido confirmada!</p>

        <h1 className="upsell-warning">¡ESPERA! TU ORDEN AÚN NO ESTÁ COMPLETA.</h1>
        
        <div className="upsell-box">
          <h2>No cierres esta página. Tenemos una Oferta Única para ti.</h2>
          
          <div className="upsell-content">
            <p>Ya tienes los guiones exactos para cerrar ventas por WhatsApp y dejar de perder dinero.</p>
            <p><strong>Pero... ¿De qué sirven los mejores guiones del mundo si no te llegan suficientes mensajes todos los días?</strong></p>
            
            <div className="upsell-offer">
              <h3>Presentamos el "Pack de 50 Plantillas de Anuncios para Facebook & Instagram Ads"</h3>
              <ul className="check-list" style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✅ Textos diseñados psicológicamente para atraer prospectos que NO buscan precio, sino calidad.</li>
                <li>✅ Incluye indicaciones exactas de qué imagen o video poner junto al texto.</li>
                <li>✅ Solo copia, pega en tu Business Manager y mira cómo tu WhatsApp explota de mensajes.</li>
              </ul>
            </div>

            <div className="upsell-price-box">
              <span className="real-price">Precio Normal: S/ 149.00</span>
              <span className="offer-price">Añádelo hoy a tu orden por solo S/ 67.00 (Pago Único)</span>
            </div>

            <div className="cta-wrapper">
              <button onClick={handleUpsellPurchase} className="cta-button upsell-btn">
                SÍ, AÑADIR EL PACK DE ANUNCIOS (S/ 67)
              </button>
            </div>

            <div className="decline-offer">
              <a 
                href="/downsell?auth=qp_secure" 
                className="decline-link"
              >
                No gracias. No quiero inundar mi WhatsApp de clientes. Ir directo a mi orden.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

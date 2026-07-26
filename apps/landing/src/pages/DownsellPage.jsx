import React, { useEffect } from 'react';
import { MP_LINKS, trackGoogleAdsEvent } from '../utils';

export default function DownsellPage() {
  useEffect(() => {
    if (!window.location.search.includes("auth=qp_secure") && window.location.search.length < 5) {
      window.location.href = "/";
    } else {
      trackGoogleAdsEvent('view_item', {
        value: 37.00,
        currency: 'PEN',
        items: [{ item_name: 'Downsell Pack 50 Plantillas' }]
      });
    }
  }, []);

  const handleDownsellPurchase = (e) => {
    e.preventDefault();
    trackGoogleAdsEvent('begin_checkout', {
      value: 37.00,
      currency: 'PEN',
      items: [{ item_name: 'Downsell Pack 50 Plantillas' }]
    });
    window.location.href = MP_LINKS.DOWNSELL;
  };

  return (
    <div className="upsell-page downsell-page">
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
        <p className="progress-text">Paso 2 de 2: Última Oportunidad Especial</p>

        <h1 className="upsell-warning" style={{ color: '#D97706' }}>¡ESPERA! NO TE VAYAS CON LAS MANOS VACÍAS.</h1>
        
        <div className="upsell-box downsell-box">
          <h2>Te ofrecemos el Pack de Anuncios a un Precio de Remate Único</h2>
          
          <div className="upsell-content">
            <p>Entendemos perfectamente que S/ 67 puede estar fuera de tu presupuesto hoy.</p>
            <p>Pero no queremos que te quedes sin la herramienta número 1 para atraer clientes calificados a tu WhatsApp todos los días.</p>
            
            <div className="upsell-offer downsell-offer">
              <h3>"Pack Completo de 50 Plantillas de Anuncios Meta Ads"</h3>
              <p style={{ fontWeight: 'bold', color: '#1F2937', margin: '0.75rem 0' }}>Descuento Exclusivo de Última Oportunidad:</p>
              <ul className="check-list" style={{ textAlign: 'left' }}>
                <li>✅ 50 Textos e imágenes copiables listos para Meta Ads (FB e IG).</li>
                <li>✅ Diseñados para atraer prospectos dispuestos a pagar sin pedir descuentos.</li>
                <li>✅ Acceso inmediato e instrucciones paso a paso.</li>
              </ul>
            </div>

            <div className="upsell-price-box">
              <span className="real-price">Precio Normal: S/ 149.00</span>
              <span className="offer-price" style={{ color: '#059669' }}>¡Solo S/ 37.00 (Pago Único)!</span>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.25rem' }}>Ahorras S/ 30.00 adicionales solo por esta pantalla.</p>
            </div>

            <div className="cta-wrapper">
              <button onClick={handleDownsellPurchase} className="cta-button downsell-btn">
                SÍ, QUIERO EL PACK DE ANUNCIOS POR SOLO S/ 37
              </button>
            </div>

            <div className="decline-offer">
              <a 
                href="/acceso-basico?auth=qp_secure" 
                className="decline-link"
              >
                No gracias. Definitivamente rechazo esta oferta única y prefiero ir directo a mi Bóveda de Guiones.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

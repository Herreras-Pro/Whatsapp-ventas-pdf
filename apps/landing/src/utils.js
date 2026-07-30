// === CONFIGURACIÓN DE LINKS DE MERCADO PAGO (PAGO ÚNICO) ===
export const MP_LINKS = {
  BASE: 'https://mpago.la/1YFVjgT',      // Bóveda Base (S/ 29.00)
  BUMP: 'https://mpago.la/2ahKeTa',      // Bóveda + Garantía Order Bump (S/ 39.00)
  UPSELL: 'https://mpago.la/21UuVmw',    // Pack 50 Anuncios Meta Ads (S/ 67.00)
  DOWNSELL: 'https://mpago.la/1tEwFNv',  // Pack 50 Anuncios Descuento (S/ 37.00)
};

// === HELPER GOOGLE ADS ===

export const GOOGLE_ADS_IDS = {
  TAG_ID: 'AW-3160406729',
  PURCHASE_LABEL: 'AW-3160406729/7655382222',
  BEGIN_CHECKOUT_LABEL: 'AW-3160406729/7702438932'
};

export const trackGoogleAdsEvent = (eventName, params = {}) => {
  if (window.gtag && typeof window.gtag === 'function') {
    let sendTo = params.send_to;
    if (!sendTo) {
      if (eventName === 'purchase') {
        sendTo = GOOGLE_ADS_IDS.PURCHASE_LABEL;
      } else if (eventName === 'begin_checkout') {
        sendTo = GOOGLE_ADS_IDS.BEGIN_CHECKOUT_LABEL;
      } else {
        sendTo = GOOGLE_ADS_IDS.TAG_ID;
      }
    }

    window.gtag('event', eventName, {
      send_to: sendTo,
      ...params
    });
  }
};

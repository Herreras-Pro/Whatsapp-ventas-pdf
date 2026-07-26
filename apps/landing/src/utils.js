// === CONFIGURACIÓN DE LINKS DE MERCADO PAGO (PAGO ÚNICO) ===
export const MP_LINKS = {
  BASE: 'https://mpago.la/1YFVjgT',      // Bóveda Base (S/ 29.00)
  BUMP: 'https://mpago.la/2ahKeTa',      // Bóveda + Garantía Order Bump (S/ 39.00)
  UPSELL: 'https://mpago.la/21UuVmw',    // Pack 50 Anuncios Meta Ads (S/ 67.00)
  DOWNSELL: 'https://mpago.la/1tEwFNv',  // Pack 50 Anuncios Descuento (S/ 37.00)
};

// === HELPER TIKTOK PIXEL & GOOGLE ADS ===
export const trackTikTokEvent = (eventName, params = {}) => {
  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track(eventName, params);
  }
};

export const trackGoogleAdsEvent = (eventName, params = {}) => {
  if (window.gtag && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

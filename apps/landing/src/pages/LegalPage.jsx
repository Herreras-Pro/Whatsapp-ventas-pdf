import React from 'react';

export default function LegalPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Términos, Condiciones y Políticas Legales</h1>
        <p className="subtitle">Última actualización: {new Date().toLocaleDateString()}</p>
        
        <div className="legal-content">
          <h3>1. Naturaleza del Producto y Exención de Responsabilidad de Ingresos (Income Disclaimer)</h3>
          <p>
            Al adquirir nuestros productos, el Usuario reconoce y acepta expresamente que está adquiriendo material educativo y plantillas de comunicación. <strong>NO garantizamos ningún nivel de ingresos, ventas, éxito comercial o retorno de inversión (ROI).</strong> Los testimonios mostrados en nuestra página web son resultados excepcionales, los cuales no pretenden garantizar que usted logrará los mismos resultados.
          </p>

          <h3>2. Política de Reembolsos Estricta (All Sales Are Final)</h3>
          <p>
            Dada la naturaleza del Producto (contenido digital descargable e intangible de acceso inmediato), las ventas son definitivas una vez descargado el material, salvo que se haya adquirido la garantía extendida correspondiente.
          </p>

          <h3>3. Propiedad Intelectual y Cláusula de No Competencia (Piratería)</h3>
          <p>
            El contenido es propiedad intelectual exclusiva de Quant Partners. Se le otorga una licencia de uso personal y comercial para su propio negocio. <strong>Queda TERMINANTEMENTE PROHIBIDA la reventa o distribución de nuestras plantillas.</strong>
          </p>

          <h3>4. Resolución de Disputas y Arbitraje Obligatorio</h3>
          <p>
            Cualquier controversia derivada de este contrato será resuelta de manera exclusiva y final mediante arbitraje de derecho en la ciudad de Lima, Perú. El Usuario renuncia expresamente a su derecho de presentar o participar en demandas colectivas.
          </p>
        </div>

        <div className="cta-wrapper" style={{ marginTop: '3rem' }}>
          <a href="/" className="cta-button" style={{ animation: 'none', background: '#3B82F6' }}>
            Volver a la página principal
          </a>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { MP_LINKS, trackTikTokEvent, trackGoogleAdsEvent } from '../utils';

// === COMPONENTE WIDGET LIVE SALES (SOCIAL PROOF TOAST EN VIVO) ===
const RECENT_SALES = [
  { name: "Luis Fernández", city: "Sullana", product: "Bóveda Maestra", price: "S/ 29", time: "hace 2 min", avatar: "👨" },
  { name: "María Luz Quispe", city: "Arequipa", product: "Bóveda + Cobertura VIP", price: "S/ 39", time: "hace 4 min", avatar: "👩" },
  { name: "Carlos Mendoza", city: "Trujillo", product: "Bóveda Maestra", price: "S/ 29", time: "hace 6 min", avatar: "👨‍💼" },
  { name: "Rosa María Vásquez", city: "Lima", product: "Bóveda + Cobertura VIP", price: "S/ 39", time: "hace 9 min", avatar: "👩‍💼" },
  { name: "Jorge Huamán", city: "Chiclayo", product: "Bóveda Maestra", price: "S/ 29", time: "hace 11 min", avatar: "🧑" },
  { name: "Ana Paula Silva", city: "Cusco", product: "Bóveda + Cobertura VIP", price: "S/ 39", time: "hace 14 min", avatar: "👩‍🌾" },
  { name: "Diego Benavides", city: "Piura", product: "Bóveda Maestra", price: "S/ 29", time: "hace 18 min", avatar: "👨‍💻" },
];

function LiveSalesNotification() {
  const [currentSaleIndex, setCurrentSaleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      const showTimer = setTimeout(() => {
        setCurrentSaleIndex((prev) => (prev + 1) % RECENT_SALES.length);
        setIsVisible(true);
      }, 7000);
      return () => clearTimeout(showTimer);
    }, 5500);

    return () => clearInterval(hideTimer);
  }, [isVisible, currentSaleIndex]);

  if (!isVisible) return null;

  const sale = RECENT_SALES[currentSaleIndex];

  return (
    <div className="live-sales-toast shadow-2xl animate-slide-up">
      <button className="toast-close" onClick={() => setIsVisible(false)} title="Cerrar">✕</button>
      <div className="toast-avatar-box">{sale.avatar}</div>
      <div className="toast-body">
        <div className="toast-header-line">
          <strong className="toast-name">{sale.name}</strong>
          <span className="toast-dot">•</span>
          <span className="toast-city">{sale.city}</span>
        </div>
        <p className="toast-action">
          acaba de comprar la <strong className="toast-prod">{sale.product}</strong> <span className="toast-tag">{sale.price}</span>
        </p>
        <div className="toast-footer-line">
          <span className="toast-badge">✔ Verificado</span>
          <span className="toast-dot">•</span>
          <span className="toast-time">{sale.time}</span>
        </div>
      </div>
    </div>
  );
}

// === COMPONENTE COUNTDOWN TIMER ===
function CountdownTimer({ timeLeft }) {
  const format = (n) => (n < 10 ? `0${n}` : n);

  return (
    <div className="countdown-card">
      <span className="countdown-title">⚡ LA OFERTA EXPIRA EN:</span>
      <div className="countdown-grid">
        <div className="time-block">
          <span className="time-num">{format(timeLeft.hours)}</span>
          <span className="time-lbl">HORAS</span>
        </div>
        <span className="time-sep">:</span>
        <div className="time-block">
          <span className="time-num">{format(timeLeft.minutes)}</span>
          <span className="time-lbl">MIN</span>
        </div>
        <span className="time-sep">:</span>
        <div className="time-block">
          <span className="time-num">{format(timeLeft.seconds)}</span>
          <span className="time-lbl">SEG</span>
        </div>
      </div>
    </div>
  );
}

// === COMPONENTE TEST / QUIZ DE DIAGNÓSTICO DE CIERRE ===
function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      q: "¿Cuántos prospectos te escriben al día por WhatsApp preguntando por tu producto?",
      options: ["1 a 5 mensajes al día", "6 a 20 mensajes al día", "Más de 20 mensajes al día"]
    },
    {
      q: "¿Qué respuesta recibes con mayor frecuencia al enviar el precio?",
      options: ["El 70% o más me clavan el VISTO", "Me piden descuentos o dicen 'está caro'", "Cierro rápido la mayoría"]
    },
    {
      q: "¿Cuánto dinero estimas que pierdes al mes por clientes que no responden?",
      options: ["S/ 300 a S/ 800 al mes", "S/ 800 a S/ 2,500 al mes", "Más de S/ 2,500 al mes"]
    }
  ];

  const handleSelect = (option) => {
    setAnswers([...answers, option]);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const scrollToCheckout = (e) => {
    e.preventDefault();
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="quiz-section-wrapper">
      <div className="container">
        <div className="quiz-card">
          <div className="quiz-header-badge">📋 DIAGNÓSTICO RÁPIDO EN 60 SEGUNDOS</div>
          <h2>Descubre la Eficiencia de tu Atención por WhatsApp</h2>
          <p className="quiz-intro">Responde 3 preguntas sencillas y calcula cuánto dinero estás dejando ir hacia tu competencia.</p>

          {!isFinished ? (
            <div className="quiz-body">
              <div className="quiz-progress-track">
                <div className="quiz-progress-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
              </div>
              <p className="quiz-step-lbl">Pregunta {step + 1} de {questions.length}</p>
              <h3 className="quiz-q-title">{questions[step].q}</h3>
              <div className="quiz-btn-group">
                {questions[step].options.map((opt, idx) => (
                  <button key={idx} className="quiz-opt-btn" onClick={() => handleSelect(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="quiz-result-box">
              <div className="result-alert-icon">🚨</div>
              <h3>Diagnóstico: Oportunidad de Mejora en la Tasa de Respuesta</h3>
              <p>Tu producto es excelente, pero la falta de una secuencia estructurada de objeciones te está costando más del 65% de tu facturación mensual.</p>
              <button onClick={scrollToCheckout} className="cta-button pulse-btn" style={{ marginTop: '1.25rem' }}>
                SISTEMATIZAR MI ATENCIÓN HOY (S/ 29)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// === LANDING PAGE PRINCIPAL RENOVADA ===
export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isBumpSelected, setIsBumpSelected] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => (n < 10 ? `0${n}` : n);

  const scrollToAgitation = (e) => {
    e.preventDefault();
    document.getElementById('agitation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    const offerValue = isBumpSelected ? 39 : 29;
    const offerName = isBumpSelected ? 'Bóveda + Garantía VIP' : 'Bóveda Base';

    trackTikTokEvent('InitiateCheckout', { 
      value: offerValue, 
      currency: 'PEN',
      content_name: offerName
    });

    trackGoogleAdsEvent('begin_checkout', {
      value: offerValue,
      currency: 'PEN',
      items: [{ item_name: offerName }]
    });

    window.location.href = isBumpSelected ? MP_LINKS.BUMP : MP_LINKS.BASE;
  };

  const faqs = [
    {
      q: "¿Sirve para mi negocio si vendo ropa/tecnología/servicios?",
      a: "Sí. Las objeciones humanas ('está caro', 'déjame pensarlo') son idénticas en todos los rubros. Las plantillas están diseñadas con espacios en blanco [ ] para que pongas el nombre de tu producto en 2 segundos y lo envíes."
    },
    {
      q: "¿Es un pago único o mensual?",
      a: "Es un PAGO ÚNICO de S/ 29. No hay suscripciones, no hay cobros recurrentes ni amarres mensuales. Pagas una sola vez y te quedas con el acceso a la Bóveda de por vida."
    },
    {
      q: "¿Cómo accedo al contenido inmediatamente después de pagar?",
      a: "Es facilísimo. Una vez completes tu pago de forma segura por Mercado Pago, el sistema te redirigirá automáticamente a tu área de entrega donde podrás acceder a la carpeta de Google Drive en 2 segundos."
    },
    {
      q: "¿Cómo funciona exactamente la garantía y el reembolso?",
      a: "Si aplicas los guiones y sientes que no te ayudaron a recuperar tu inversión, escríbenos a devoluciones@thequantpartners.com. Te devolveremos el 100% de tu dinero directamente a tu cuenta de Mercado Pago sin preguntas. Y los archivos descargados te los quedas como regalo."
    },
    {
      q: "¿Tengo que instalar alguna app o software complicado?",
      a: "Cero tecnología. Al comprar, te damos el link a una carpeta de Google Drive. Puedes abrir los documentos desde tu celular, copiar el texto y pegarlo directamente en el chat de tu cliente en WhatsApp."
    }
  ];

  return (
    <div className="landing-wrapper">
      {/* BADGE / WIDGET SOCIAL PROOF EN VIVO */}
      <LiveSalesNotification />

      {/* TOP URGENCY STICKY BANNER CON TIMER */}
      <div className="top-banner urgency-pulse sticky-top-banner">
        🔥 OFERTA FLASH 90% OFF · Expira en{' '}
        <span className="top-banner-timer">
          {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
        </span>{' '}
        · S/ 29 (Subirá a S/ 97)
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">📦 RECURSO B2B PARA NEGOCIOS</div>
          <h1>
            Plantillas de Comunicación por <span className="highlight">WhatsApp</span> para Sistematizar la Atención al Cliente.
          </h1>
          <p className="subtitle">
            El manual estructurado que utilizan los asesores comerciales en Perú para responder consultas, gestionar seguimientos y mantener un flujo de comunicación profesional.
          </p>

          <div className="hero-grid">
            <div className="hero-cta-col">
              {/* BADGE DE ESCASEZ Y CUPOS DISPONIBLES (EN DESKTOP) */}
              <div className="hero-scarcity-card desktop-only-scarcity">
                <span className="scarcity-icon">🚨</span>
                <div className="scarcity-info">
                  <strong className="scarcity-title">¡ÚLTIMOS CUPOS PROMOCIONALES!</strong>
                  <span className="scarcity-desc">Solo quedan <span className="highlight-seats">4 accesos disponibles</span> a S/ 29.</span>
                </div>
              </div>

              <div className="cta-wrapper hero-desktop-cta-wrapper">
                <button onClick={scrollToAgitation} className="cta-button pulse-btn">
                  ACCEDER A LAS PLANTILLAS (S/ 29)
                </button>
                <span className="secure-badge">🔒 Pago 100% Seguro vía Mercado Pago Perú</span>
                <span className="guarantee-text">⏱️ Acceso Inmediato · Pago Único De Por Vida</span>
              </div>
            </div>

            {/* MOCKUP 3D DIGIAL CARD */}
            <div className="hero-mockup-col">
              <div className="hero-mockup-card">
                <div className="mockup-header">
                  <span className="tag">ECOSISTEMA DIGITAL</span>
                  <div className="line"></div>
                </div>
                <h2>BÓVEDA MAESTRA DE CIERRES</h2>
                <p className="sub">Guiones Anti-Visto & Manejo de Objeciones por WhatsApp</p>
                <div className="mockup-emojis">📱 💬 🚀 💸 📁</div>
                <p className="mockup-italic">Edición Perú 2026 — Copia, pega y cierra en 10 segundos</p>
                <div className="mockup-price-tag">
                  <span className="lbl">SOLO</span>
                  <span className="val">S/ 29</span>
                  <span className="off">90% OFF</span>
                </div>
              </div>

              {/* BADGE DE ESCASEZ Y CUPOS DISPONIBLES (EN MOBILE REEMPLAZA AL BOTÓN VERDE) */}
              <div className="hero-scarcity-card mobile-only-scarcity">
                <span className="scarcity-icon">🚨</span>
                <div className="scarcity-info">
                  <strong className="scarcity-title">¡ÚLTIMOS CUPOS PROMOCIONALES!</strong>
                  <span className="scarcity-desc">Solo quedan <span className="highlight-seats">4 accesos disponibles</span> a S/ 29.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-testimonial-badge">
            <div className="stars">⭐⭐⭐⭐⭐ <strong>4.9/5 valoración</strong> por 1,200+ emprendedores</div>
            <p className="hero-testimonial-text">
              <em>"En la primera hora usando la plantilla Anti-Visto recuperé a 3 clientas. El mejor pago único de mi negocio."</em>
            </p>
            <span className="hero-testimonial-author">- Lucía R. (Tienda de Ropa)</span>
          </div>

          <div className="trust-badges">
            <span>✅ Pago 100% Seguro</span>
            <span>✅ Descarga Inmediata</span>
            <span>✅ Sin mensualidades (Pago Único)</span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-num">60+</div>
              <div className="stat-lbl">Guiones Copy-Paste</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">3</div>
              <div className="stat-lbl">Bonos de Regalo Gratis</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">1,200+</div>
              <div className="stat-lbl">Emprendedores Felices</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-lbl">Pago Único Vitalicio</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN CARDS / AGITATION */}
      <section className="agitation" id="agitation">
        <div className="container">
          <div className="section-tag-red">¿POR QUÉ TUS VENTAS SE CAEN?</div>
          <h2>El error que te está costando miles de soles en WhatsApp:</h2>
          <div className="pain-cards-grid">
            <div className="pain-card">
              <div className="pain-emoji">💬</div>
              <h3>Te clavan el VISTO</h3>
              <p>Pagas publicidad, consigues prospectos, te preguntan "¿Precio?"... y desaparecen. Dinero a la basura.</p>
            </div>
            <div className="pain-card">
              <div className="pain-emoji">💸</div>
              <h3>Guerra de precios</h3>
              <p>Te frustra ver cómo se asustan por el precio y corren con la competencia más barata e informal.</p>
            </div>
            <div className="pain-card">
              <div className="pain-emoji">😤</div>
              <h3>"Está muy caro"</h3>
              <p>No sabes qué responder cuando te dicen "yo te aviso", y terminas regalando descuentos que matan tu margen.</p>
            </div>
            <div className="pain-card">
              <div className="pain-emoji">🔄</div>
              <h3>Cero seguimiento</h3>
              <p>Sientes vergüenza de insistir porque piensas que estás 'rogando', y pierdes el 80% de ventas que cierran al 2do intento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ SECTION */}
      <QuizSection />

      {/* COMPARISON VS TABLE */}
      <section className="vs-section">
        <div className="container">
          <div className="section-tag-orange">LA DIFERENCIA</div>
          <h2>Por qué esta Bóveda <span className="highlight-text">sí funciona</span> donde otros fallan</h2>
          <p className="vs-sub">La mayoría de emprendedores pierden clientes porque responden improvisando sin una estructura persuasiva.</p>

          <div className="vs-grid">
            <div className="vs-card vs-bad">
              <div className="vs-header">
                <span className="vs-icon-bad">❌</span>
                <h3>Sin la Bóveda Maestra</h3>
                <p className="vs-sub-lbl">Lo que probablemente haces hoy</p>
              </div>
              <ul className="vs-list">
                <li>❌ Enviar el precio a secas y quedar esperando milagros.</li>
                <li>❌ Hacer descuentos desesperados que dañan tu margen de ganancia.</li>
                <li>❌ Sentir vergüenza de escribir de nuevo tras ser dejado en visto.</li>
                <li>❌ Perder horas pensando qué responder a cada cliente.</li>
                <li>❌ Depender de la suerte y sufrir por las bajas ventas.</li>
              </ul>
            </div>

            <div className="vs-card vs-good">
              <div className="vs-badge-tag">⭐ RECOMENDADO</div>
              <div className="vs-header">
                <span className="vs-icon-good">✅</span>
                <h3>Con la Bóveda Maestra</h3>
                <p className="vs-sub-lbl">El método copy-paste de alto rendimiento</p>
              </div>
              <ul className="vs-list">
                <li>✅ Guiones Anti-Visto que despiertan el interés inmediato.</li>
                <li>✅ Plantillas para defender el valor sin bajar tu precio.</li>
                <li>✅ Seguimiento persuasivo elegante en 10 segundos.</li>
                <li>✅ Respuestas inmediatas copy-paste probadas en Perú.</li>
                <li>✅ Cierres constantes y control total de tus ingresos.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUALIFICATION SECTION */}
      <section className="qualification">
        <div className="container">
          <div className="qualification-box">
            <h2>Esta Bóveda es 100% para ti si:</h2>
            <ul className="qualification-list">
              <li>
                <strong>✅ Vendes productos, ropa, servicios o cursos por WhatsApp</strong> y recibes mensajes de prospectos todos los días.
              </li>
              <li>
                <strong>✅ Estás cansado de mandar el precio y que te claven el visto</strong> sin tener la oportunidad de defender tu valor.
              </li>
              <li>
                <strong>✅ Quieres copiar y pegar respuestas probadas en 10 segundos</strong> sin perder tiempo pensando qué escribir ni rogar por la venta.
              </li>
              <li>
                <strong>✅ Buscas vender al precio justo y proteger tu margen</strong> sin regalar descuentos a la competencia más barata.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS EXPANDED */}
      <section className="testimonials">
        <div className="container">
          <div className="section-tag-orange">CASOS DE ÉXITO</div>
          <h2>Lo que dicen otros emprendedores en Perú</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p><em>"Antes mandaba la lista de precios y el 80% no me respondía. El primer día usé la plantilla de reactivación y cerré 4 pedidos acumulados de la semana."</em></p>
              <strong>- Marcos R. (Venta de Calzado, Lima)</strong>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p><em>"Pensé que era otro libro largo, pero son plantillas listas para copiar y pegar desde el celular. Mi tasa de conversión subió del 10% al 35% en 2 semanas."</em></p>
              <strong>- Diana S. (Servicios Estéticos, Arequipa)</strong>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p><em>"El bono de audios persuasivos es una joya. Les mando el audio siguiendo el guión y los clientes sienten total confianza para yapear al toque."</em></p>
              <strong>- Gonzalo P. (Accesorios Tech, Trujillo)</strong>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p><em>"Recuperé la inversión de S/29 con la primera venta que rescaté del 'visto'. Es la compra más rentable que he hecho este año."</em></p>
              <strong>- Patricia M. (Ropa Femenina, Chiclayo)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STACK & CHECKOUT */}
      <section className="value-stack" id="checkout-section">
        <div className="container">
          <h2>No compres un PDF. Accede al Ecosistema de Cierre:</h2>
          
          <div className="stack-item">
            <strong>📁 La Bóveda Anti-Visto (60+ Guiones Copy-Paste)</strong>
            <span className="value">S/ 199.00</span>
          </div>
          <div className="stack-item">
            <strong>🔥 Bono 1: Arsenal de Seguimiento Agresivo</strong>
            <span className="value">S/ 97.00</span>
          </div>
          <div className="stack-item">
            <strong>🤖 Bono 2: Mega-Prompts de IA para Cierre Infinito</strong>
            <span className="value">S/ 149.00</span>
          </div>
          <div className="stack-item">
            <strong>✅ Bono 3: Plantillas de Audios Persuasivos</strong>
            <span className="value">S/ 47.00</span>
          </div>

          <div className="total-value">
            <div className="urgency-bar-container">
              <div className="urgency-bar-header">
                <span className="urgency-fire-text">🔥 <strong>88% de los accesos reservados</strong></span>
                <span className="urgency-seats-badge">¡Solo 4 disponibles!</span>
              </div>
              <div className="urgency-progress-track">
                <div className="urgency-progress-fill"></div>
              </div>
            </div>

            <span className="real-price">Valor Total Real: S/ 492.00</span>
            <span className="offer-price">
              {isBumpSelected ? "¡Solo S/ 39.00!" : "¡Solo S/ 29.00!"}
            </span>
            <span className="urgency">Pago Único. Acceso de por vida.</span>

            <div className="order-bump-container" style={{ margin: '1.5rem 0', textDecoration: 'none' }}>
              <label className="order-bump-card" style={{ background: 'white' }}>
                <input 
                  type="checkbox" 
                  checked={isBumpSelected} 
                  onChange={(e) => setIsBumpSelected(e.target.checked)}
                  className="order-bump-checkbox"
                />
                <div className="order-bump-info" style={{ textAlign: 'left' }}>
                  <span className="bump-tag pulse-tag">🛡️ PROTECCIÓN VIP CERO RIESGO (+ S/ 10.00)</span>
                  <strong className="bump-title">Añadir Cobertura de Reembolso Garantizado de "100% Cero Riesgo"</strong>
                  <p className="bump-desc">
                    Esto es simple: Descarga la Bóveda, copia un guión, pégalo en tu próximo chat de WhatsApp. <strong>Si con una sola venta que cierres no recuperas tu inversión</strong>, se te devuelve el 100% de tu dinero y te quedas con todo el material de regalo.
                  </p>
                </div>
              </label>
            </div>
            
            <div className="cta-wrapper">
              <button onClick={handlePurchase} className="cta-button pulse-btn">
                {isBumpSelected ? "QUIERO MIS GUIONES + GARANTÍA (S/ 39)" : "SÍ, QUIERO RECUPERAR MIS VENTAS (S/ 29)"}
              </button>
              <span className="secure-badge">🔒 Transacción Encriptada vía Mercado Pago</span>
            </div>

            <div className="checkout-testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p><em>"Antes mandaba el precio y rezaba. Ayer usé el guión de manejo de objeciones y cerré una venta de S/450 que ya daba por perdida. Increíble."</em></p>
              <strong>- Carlos M. (Venta de Tecnología)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="faqs">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="faq-q">
                  {faq.q}
                  <span>{activeFaq === index ? '−' : '+'}</span>
                </div>
                {activeFaq === index && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-contact">
            <h3>Contáctanos</h3>
            <p>✉️ Mail: partners@thequantpartners.com</p>
            <p>📍 Lima, Perú | Quant Partners</p>
          </div>

          <p style={{ fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--gray)' }}>
            2026 | Quant Partners | <a href="/terminos" style={{ color: 'inherit', textDecoration: 'underline' }}>Política de Privacidad</a> | <a href="/terminos" style={{ color: 'inherit', textDecoration: 'underline' }}>Términos y Condiciones</a>
          </p>

          <p className="footer-disclaimer" style={{ textAlign: 'justify', fontSize: '0.75rem', color: '#6B7280', lineHeight: '1.6' }}>
            Este sitio web es operado y mantenido por Quant Partners. El uso de este sitio web se rige por sus Términos de Servicio y Política de Privacidad. Quant Partners es una empresa proveedora de herramientas de ventas, plantillas y recursos de marketing digital. No vendemos oportunidades de negocio, programas para "hacerse rico rápidamente" ni sistemas automáticos para ganar dinero. Todos los productos, servicios, guiones, contenidos, herramientas y estrategias proporcionados por la empresa tienen fines exclusivamente educativos, referenciales e informativos.
            <br /><br />
            No podemos ni garantizamos tu capacidad para obtener resultados o generar ingresos a partir de nuestras plantillas, ideas, herramientas o estrategias. Nada de lo expuesto en este sitio web, en ninguno de nuestros otros sitios, programas, contenidos o productos constituye una promesa o garantía de resultados, ingresos actuales o futuros. No realizamos afirmaciones sobre ganancias, esfuerzos ni aseguramos que el uso de nuestros guiones produce resultados financieros específicos.
            <br /><br />
            Cualquier cifra financiera mencionada es únicamente ilustrativa de conceptos y no debe interpretarse como ingresos promedio, exactos o garantizados. No proporcionamos asesoramiento legal, contable, fiscal ni profesional de ningún tipo. Siempre debes consultar con tu contador, abogado o asesor profesional antes de tomar decisiones basadas en esta información relacionadas con tu negocio o finanzas.
            <br /><br />
            El éxito de nuestros clientes varía significativamente. Aunque compartimos plantillas y estrategias que han funcionado para otros, los resultados individuales dependen de múltiples factores, incluidos —pero no limitados a— la calidad del producto o servicio que vendes, tu mercado, experiencia previa, habilidades comerciales, dedicación, tiempo invertido y circunstancias personales. No garantizamos que obtendrás resultados similares a los ejemplos, estudios de caso o testimonios mostrados.
            <br /><br />
            Los testimonios, declaraciones y representaciones reflejan opiniones, hallazgos o experiencias de usuarios individuales que han adquirido nuestros recursos. Son anecdóticos y no representan necesariamente la experiencia típica ni predicen resultados futuros. Los resultados individuales pueden variar de manera significativa. No medimos ganancias ni desempeño financiero. En su lugar, podemos realizar seguimientos de transacciones completadas y niveles de satisfacción mediante encuestas voluntarias. No debes equiparar transacciones completadas con éxito financiero.
            <br /><br />
            Muchos clientes no continúan con el programa, no aplican lo aprendido o intentan aplicar los guiones sin obtener los resultados esperados. Al utilizar este sitio y registrarte en nuestros servicios, reconoces que eres el único responsable de tus decisiones, acciones y resultados, y aceptas no intentar responsabilizar a Quant Partners bajo ninguna circunstancia.
            <br /><br />
            Todo el material es propiedad intelectual de Quant Partners and está protegido por derechos de autor. Cualquier duplicación, reventa, reproducción o distribución no autorizada está estrictamente prohibida y sujeta a acciones legales. La Empresa puede enlazar o hacer referencia a contenidos, servicios o recursos creados o proporcionados por terceros no afiliados. Quant Partners no es responsable de dicho contenido ni lo respalda o aprueba.
            <br /><br />
            Utilizamos cookies para mejorar, promover y proteger nuestros servicios. Al continuar utilizando este sitio, aceptas nuestra Política de Privacidad y Términos de Uso.
            <br /><br />
            Este sitio no forma parte del sitio web de Facebook, Meta o Google. Este sitio NO está respaldado por Facebook o Google de ninguna manera. FACEBOOK es una marca registrada de META, Inc.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="sticky-mobile-cta">
        <button onClick={scrollToAgitation} className="cta-button pulse-btn" style={{width: '100%', fontSize: '1.05rem', padding: '0.75rem'}}>
          QUIERO MIS GUIONES (S/ 29)
        </button>
      </div>
    </div>
  );
}

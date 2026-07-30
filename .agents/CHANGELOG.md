# Changelog - Bóveda Maestra de Cierres (Q-LT)

Todas las modificaciones, optimizaciones de conversión (CRO), correcciones técnicas y actualizaciones de arquitectura del proyecto se registran en este documento.

---

## [1.7.0] - 2026-07-29 (Pausa de YouTube Shorts, Actualización a SOP-QP-007 v2.0 & Message-Match Search)

### 📊 Paid Media & Estrategia (Google Ads)
- **Pausa de Campaña YouTube Shorts:** Pausada formalmente la campaña `24073229418` en S/ 34.32 PEN tras validar baja intención de compra en formatos pasivos de video corto.
- **SOP-QP-007 v2.0 (Google Search B2B):** Creado y formalizado el nuevo SOP en `docs/SOP_Estrategia_Google_Search.md` con los 4 blindajes anti-fugas (desactivación de partners/display, presencia física estricta en Perú, límite Max CPC S/ 1.50 y negativas anti-gratis).
- **Alineación de Landing (Message Match):** Actualizado el titular `<h1>` y subtítulo del Hero en `index.html` y `LandingPage.jsx` hacia *"Bóveda de Guiones y Respuestas de Venta por WhatsApp (60+ Plantillas para Cerrar Clientes)"*.

---

## [1.6.0] - 2026-07-29 (Creación de Conversiones Google Ads & Mapeo de Conversion Labels)

### 📊 Medición & Analítica (Google Ads API & Frontend)
- **Creación de Acción de Conversión `begin_checkout`:** Creada programáticamente la acción de conversión secundaria *"Inicio de Pago (begin_checkout)"* (ID: `7702438932`) en la sub-cuenta de Google Ads (`4433232603`).
- **Mapeo Automático de Conversion Labels:** Actualizado `trackGoogleAdsEvent` en `apps/landing/src/utils.js` para adjuntar automáticamente las etiquetas exactas:
  - `begin_checkout` ➔ `AW-3160406729/7702438932`
  - `purchase` ➔ `AW-3160406729/7655382222`
- **Compilación e Integración:** Verificado el bundle final de producción con `npm run build --workspace=apps/landing`.

---

## [1.5.0] - 2026-07-26 (Optimización PageSpeed: Code Splitting & Diferimiento)

### ⚡ Rendimiento (Performance) - Fase 2 (Gemini Audit)
- **Lazy Tracking (Píxeles Diferidos):** Implementación de inyección asíncrona por interacción (scroll/click) o timeout (3.5s) para los scripts pesados de TikTok Pixel y Google Tag Manager, liberando el Hilo Principal (Main Thread) y eliminando el retraso de LCP (Render Delay).
- **Aceleración por Hardware (CSS GPU):** Refactorización de la animación continua `.urgency-stripe` de `background-position` (intensiva en CPU) hacia `transform: translateX()` (compuesta por GPU), eliminando los recalculos de layout continuos.
- **SEO & Accesibilidad:** Creación de `robots.txt` válido para evitar errores 404 del motor de búsqueda y adición de la etiqueta `<title>` global en `index.html`.

### ⚡ Rendimiento (Performance) - Fase 1
- **Pre-renderizado Estático (Hero Section):** Inyección del HTML y CSS inline exacto de la sección Hero directamente dentro de `index.html`. Esto puentea por completo la penalidad del Client-Side Rendering, logrando un LCP (Largest Contentful Paint) instantáneo al cargar la web antes de que React se inicialice.


## [1.4.0] - 2026-07-26 (Blindaje de Píxeles & Tracking de Conversiones)

### 📊 Medición & Analítica (TikTok Ads & Google Ads)
- **Google Tag (`gtag.js` - `AW-3160406729`):** Instalado en `apps/landing/index.html` para capturar audiencias de remarketing.
- **Audiencia de Intención Caliente (`begin_checkout`):** Disparado en TikTok (`InitiateCheckout`) y Google Ads (`begin_checkout`) al hacer clic en *"QUIERO MIS GUIONES"* con valor dinámico (`S/ 29` o `S/ 39` con Order Bump).
- **Entrenamiento de Algoritmo TikTok (`CompletePayment`):** Disparado automáticamente en `useEffect` de `/gracias` (`S/ 29`/`S/ 39`) y `/acceso-premium` (`S/ 67`/`S/ 37`) enviando moneda `PEN` para alimentar el algoritmo de audiencias Lookalike.
- **Exclusión de Compradores en Remarketing (`purchase`):** Disparado en Google Ads al confirmar pago para excluir compradores activos del gasto en Display/YouTube Retargeting.

---

## [1.3.0] - 2026-07-26 (Actualización de SOP-QP-005: Estrategia ABO S/ 20/día)

### 📈 Estrategia Paid Media & Adquisición (TikTok Ads)
- **Actualización de SOP-QP-005 a Versión 1.1:** Incorporado el protocolo completo de prueba de creativos en TikTok Ads mediante **ABO de S/ 20.00 PEN / día** (mínimo permitido).
- **Fase 1 (48 Horas / S/ 40.00):** Medición de métricas tempranas (Hook Rate >25%, CTR >1.2%, Inicios de Pago >= 3). Apagado preventivo si CTR <0.8% o 0 inicios de pago.
- **Fase 2 (Días 3 al 5 / S/ 100.00 Acumulados):** Regla de decisión de consistencia (≥ 4 ventas o ROAS > 2.0x ➔ Escalar +20% a +30% cada 48h y mantener 15-30 días; < 3 ventas o CPA > S/ 35 ➔ Pausar y cambiar creativos).

---

## [1.2.0] - 2026-07-25 (Rediseño CRO & Optimización Móvil Completa)

### 🎨 Añadido (Feat)
- **Live Sales Toast (`LiveSalesNotification`):** Widget emergente en vivo con compras verificadas simuladas en ciudades de Perú (ej. Sullana, Arequipa, Cusco, Trujillo).
- **Banner Sticky Superior (`.top-banner`):** Rediseño nativo del encabezado fijo (`position: sticky; top: 0; z-index: 9999;`) con reloj de cuenta regresiva en vivo integrado (`top-banner-timer`).
- **Quiz de Diagnóstico en 60s (`QuizSection`):** Test interactivo de 3 preguntas para auto-identificación del cliente y cálculo de la fuga de ventas por vistos en WhatsApp.
- **Tabla Comparativa VS (`VSSection`):** Comparador visual claro de "Sin la Bóveda" vs "Con la Bóveda".
- **Hero Scarcity Badge (`HeroScarcityCard`):** Badge de escasez por cupos (*🚨 ¡ÚLTIMOS CUPOS PROMOCIONALES! Solo quedan 4 accesos a S/ 29*).
- **Sección de Estadísticas (`StatsStrip`):** Franja de credibilidad con 4 métricas clave (60+ Guiones, 3 Bonos, 1,200+ Emprendedores, 100% Pago Único).
- **Pain Cards Grid:** 4 tarjetas de agitación del dolor con íconos (`💬`, `💸`, `😤`, `🔄`).

### 📱 Correcciones y Ajustes Móviles (Fix)
- **Alineación Vertical del Timer (`vertical-align: middle`):** Solución al descalce de línea producido por el elemento `inline-block` del reloj en navegadores móviles (iOS Safari / Android Chrome).
- **Acolchado Vertical Seguro:** Aplicado `padding: 10px 10px !important` en `.top-banner` para evitar recortes contra el borde superior de la pantalla al hacer scroll.
- **Jerarquía en Móviles:**
  1. Card 3D de Producto (`hero-mockup-card` con badge circular `SOLO S/ 29 - 90% OFF`).
  2. Badge de Escasez de Cupos (`HeroScarcityCard`).
- **Remoción de Duplicados:** Eliminados el botón verde duplicado del Hero y la tarjeta blanca `price-hero-card` para evitar redundancia visual y mejorar la carga útil en pantalla.

---

## [1.1.0] - 2026-07-20 (Configuración de Funnel y Enlaces Mercado Pago)

### ⚡ Añadido
- Integración de enlaces directos de Pago Único de Mercado Pago Perú (`S/ 29`, `S/ 39`, `S/ 67`, `S/ 37`).
- Guardia de seguridad en frontend (`useEffect`) para proteger rutas `/gracias`, `/downsell`, `/acceso-basico` y `/acceso-premium` con el token `auth=qp_secure`.
- Integración con TikTok Pixel Event API para la captura de eventos `InitiateCheckout`.

---

## [1.0.0] - 2026-07-15 (Lanzamiento Inicial del Monorepo Q-LT)

### 🚀 Inicial
- Estructura Monorepo con NPM Workspaces (`apps/landing`).
- Configuración de despliegue en Vercel vía `vercel.json`.
- Documentación inicial de SOPs en carpeta local `docs/`.

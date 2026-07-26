# Changelog - Bóveda Maestra de Cierres (Q-LT)

Todas las modificaciones, optimizaciones de conversión (CRO), correcciones técnicas y actualizaciones de arquitectura del proyecto se registran en este documento.

---

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

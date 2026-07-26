# Changelog - Bóveda Maestra de Cierres (Q-LT)

Todas las modificaciones, optimizaciones de conversión (CRO), correcciones técnicas y actualizaciones de arquitectura del proyecto se registran en este documento.

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

# Contexto del Proyecto: Bóveda Maestra de Cierres (Q-LT)

## Arquitectura (Monolito Modularizado)
- **Framework:** NPM Workspaces Monorepo.
- **Frontend (Landing):** `apps/landing` (Vite + React). Hospedado en Vercel.
- **Repositorio Git Remote:** `https://github.com/Herreras-Pro/Whatsapp-ventas-pdf.git`
- **Despliegue Vercel:** Orquestado automáticamente mediante `vercel.json` en la raíz (`npm run build --workspace=apps/landing`).
- **Backend/Dashboard:** Carpetas preparadas en `apps/backend` y `apps/dashboard` para futuras expansiones.
- **Historial de Cambios (Changelog):** Registo cronológico detallado mantenido en `.agents/CHANGELOG.md`.

## Embudo de Ventas (Funnel) - 100% Pago Único (Sin Suscripciones)
1. **Tráfico Principal:** TikTok Ads hacia la Landing Page (`/`).
2. **Producto Principal (Landing `/`):** 
   - **Bóveda Base:** S/ 29.00 (Pago Único, Acceso De Por Vida).
     - Link Mercado Pago: `https://mpago.la/1YFVjgT`
     - Redirección en MP: `https://boveda.thequantpartners.com/gracias`
   - **Order Bump de Cobertura VIP:** + S/ 10.00 (Garantía Extendida 100% Cero Riesgo).
     - Link Mercado Pago Combinado (Base + Bump S/ 39.00): `https://mpago.la/2ahKeTa`
     - Redirección en MP: `https://boveda.thequantpartners.com/gracias`
3. **Upsell (OTO - `/gracias`):**
   - **Pack de 50 Plantillas de Anuncios:** S/ 67.00 (Pago Único).
     - Link Mercado Pago: `https://mpago.la/21UuVmw`
     - Si ACEPTA: Paga en Mercado Pago -> Redirige a `/acceso-premium`.
     - Si RECHAZA: Clic en enlace -> Redirige a `/downsell?auth=qp_secure`.
4. **Downsell (`/downsell`):**
   - **Descuento Exclusivo Pack 50 Plantillas de Anuncios:** S/ 37.00 (Pago Único).
     - Link Mercado Pago: `https://mpago.la/1tEwFNv`
     - Si ACEPTA: Paga en Mercado Pago -> Redirige a `/acceso-premium`.
     - Si RECHAZA: Clic en enlace -> Redirige a `/acceso-basico?auth=qp_secure`.

## Entregables (Fulfillment)
- Los accesos se entregan vía Google Drive y PDF.
- `/acceso-basico`: Entrega enlace a carpeta compartida de Drive para la Bóveda de Guiones.
- `/acceso-premium`: Entrega enlace a la carpeta compartida de la Bóveda Y enlace directo al PDF de Plantillas de Anuncios.

## Reglas de Seguridad Frontend (MVP)
- Las rutas `/gracias`, `/downsell`, `/acceso-basico` y `/acceso-premium` tienen un guardia en `useEffect` que expulsa a los usuarios que intentan acceder directamente escribiendo la URL sin los tokens de Mercado Pago o parámetros internos válidos (`auth=qp_secure`), redirigiéndolos al index `/`.

## Optimización de Conversión (CRO) y Estructura Alex Hormozi ($100M Offers)
1. **Banner de Urgencia Sticky Superior Nativo (`.top-banner`):** 
   - Estructurado como `position: sticky; top: 0; z-index: 9999;` directamente en la raíz de la página.
   - Contiene la cuenta regresiva en vivo (`.top-banner-timer`) formateada con `vertical-align: middle` y `line-height: 1.4` (evita descalces o recortes verticales en dispositivos móviles iOS/Android).
2. **Social Proof Toast en Vivo (`LiveSalesNotification`):** Widget emergente interactivo que simula compras recientes verificadas en ciudades del Perú (ej. Sullana, Arequipa, Cusco) para generar urgencia en tiempo real.
3. **Hero Section (Hook & Gran Promesa):** 
   - Card 3D de producto digital con inclinación y badge de descuento.
   - Card 3D de producto digital con inclinación y badge de descuento (`SOLO S/ 29 - 90% OFF`).
   - Orden en Móviles: 1. Card 3D de Producto ➔ 2. Badge de Escasez de Cupos. (El botón verde duplicado del Hero se oculta en móviles).
   - Badge de prueba social inline (5 estrellas, Lucía R.).
4. **Stats Strip:** Franja oscura de 4 métricas de credibilidad (60+ Guiones, 3 Bonos, 1,200+ Emprendedores, 100% Pago Único).
5. **Agitación del Dolor (`PainCardsGrid`):** 4 tarjetas de dolor con íconos (`💬`, `💸`, `😤`, `🔄`) para agitar los errores comunes en WhatsApp (vistos, guerra de precios, sin seguimiento).
6. **Quiz de Diagnóstico Rápido (`QuizSection`):** Test interactivo en 3 preguntas ("Diagnóstico Rápido en 60s") con cálculo de fuga de ventas para auto-identificación del cliente.
7. **Tabla VS Comparativa (`VSSection`):** Comparativo visual claro de "Sin la Bóveda" vs "Con la Bóveda".
8. **Sección de Calificación (`✅`):** *Esta Bóveda es 100% para ti si... (Filtro de perfil de cliente).*
9. **Stack de Valor & Checkout (`#checkout-section`):** 
   - Ecosistema completo de guiones y bonos desglosados.
   - Barra de Urgencia Roja estática con franjas animadas (`🔥 88% de accesos reservados / 4 cupos disponibles`).
   - Casilla de Order Bump interactiva (+ S/ 10.00 Cobertura VIP Cero Riesgo).
   - Micro-Testimonio de Cierre (Carlos M.).
10. **Preguntas Frecuentes (FAQs):** Enfoque en Pago Único sin mensualidades.
11. **Trust Factor & Legal Footer:** Datos de contacto `partners@thequantpartners.com` y Disclaimer legal completo.

## Estado del Ecosistema de SOPs (Guardados en `docs/` local)
- `SOP-QP-001`: Creación de Micro-servicios / Landings (Completado).
- `SOP-QP-002`: Creación y Lanzamiento de TikTok Ads & Events API (Completado - Developer App en aprobación).
- `SOP-QP-003`: Producción de Creativos Verticales Cinemáticos de 10s con IA y TikTok Symphony v2.1 (Completado).
- `SOP-QP-004`: Atención al Cliente y Reembolsos por Correo (Completado).
- `SOP-QP-005`: Control de Métricas, CPA y Reglas de Escalamiento (Completado).

## Reglas Operativas y de Control Git
- **Confirmación Obligatoria de Push:** SIEMPRE preguntar y solicitar autorización explícita al usuario ANTES de ejecutar `git push`.
- **Protección de SOPs y Credenciales:** La carpeta `docs/` y archivos `.env.local` son estrictamente locales y están ignorados en `.gitignore`.
- **Metodología de Creación de SOPs:** 1. **Pensar** (Estrategia y Alineación) ➔ 2. **Ejecutar** (Código, Integraciones y Pruebas) ➔ 3. **Documentar** (Redacción del SOP oficial verificado).

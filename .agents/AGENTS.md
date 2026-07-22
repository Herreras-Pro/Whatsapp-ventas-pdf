# Contexto del Proyecto: Bóveda Maestra de Cierres (Q-LT)

## Arquitectura (Monolito Modularizado)
- **Framework:** NPM Workspaces Monorepo.
- **Frontend (Landing):** `apps/landing` (Vite + React). Hospedado en Vercel.
- **Backend/Dashboard:** Carpetas preparadas en `apps/backend` y `apps/dashboard` para futuras expansiones.

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
1. **Banner de Urgencia Promocional:** Escasez y aviso de cambio de precio.
2. **Hero Section (Hook & Gran Promesa):** Promesa principal + Botón de Ancla suave a agitación (`#agitation`) + Badge de Prueba Social Inline (5 estrellas, Lucía R.).
3. **Agitación del Dolor (`❌`):** *El error que te está costando miles de soles (vistos, guerra de precios, descuentos).*
4. **Sección de Calificación (`✅`):** *Esta Bóveda es 100% para ti si... (Auto-identificación del cliente).*
5. **Stack de Valor & Checkout (`#checkout-section`):** 
   - Ecosistema completo de guiones y bonos.
   - Barra de Urgencia Roja interactiva con franjas animadas (88% reservado / 4 cupos disponibles).
   - Animación de rebote suave (`gentle-bounce`) en precios y badges clave.
   - Casilla de Order Bump interactiva (Garantía Extendida por S/ 10).
   - Micro-Testimonio de Cierre (Carlos M.).
6. **Preguntas Frecuentes (FAQs):** Enfoque en Pago Único sin mensualidades.
7. **Trust Factor & Legal Footer:** Datos de contacto `partners@thequantpartners.com` y Disclaimer legal completo.

## Estado del Ecosistema de SOPs (Guardados en `docs/` local)
- `SOP-QP-001`: Creación de Micro-servicios / Landings (Completado).
- `SOP-QP-002`: Creación y Lanzamiento de TikTok Ads & Events API (Completado - Developer App en aprobación).
- `SOP-QP-003`: Producción de Creativos Verticales con IA (Completado).
- `SOP-QP-004`: Atención al Cliente y Reembolsos por Correo (Completado).
- `SOP-QP-005`: Control de Métricas, CPA y Reglas de Escalamiento (Completado).

## Reglas Operativas y de Control Git
- **Confirmación Obligatoria de Push:** SIEMPRE preguntar y solicitar autorización explícita al usuario ANTES de ejecutar `git push`.
- **Protección de SOPs y Credenciales:** La carpeta `docs/` y archivos `.env.local` son estrictamente locales y están ignorados en `.gitignore`.
- **Metodología de Creación de SOPs:** 1. **Pensar** (Estrategia y Alineación) ➔ 2. **Ejecutar** (Código, Integraciones y Pruebas) ➔ 3. **Documentar** (Redacción del SOP oficial verificado).

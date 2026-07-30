import { GoogleAdsApi } from 'google-ads-api';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const childCustomerId = '4433232603';
const managerCustomerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '');

const customer = client.Customer({
  customer_id: childCustomerId,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
  login_customer_id: managerCustomerId,
});

async function main() {
  try {
    console.log("🚀 1. Creando Presupuesto Diario de S/ 20.00 PEN...");
    const budgetResult = await customer.campaignBudgets.create([
      {
        name: `Presupuesto Search S/ 20/día - ${Date.now()}`,
        amount_micros: 20000000,
        delivery_method: 'STANDARD',
      },
    ]);
    const budgetResourceName = budgetResult.results[0].resource_name;
    console.log(`✅ Presupuesto creado: ${budgetResourceName}`);

    console.log("\n🚀 2. Creando Campaña de Búsqueda (Search) con 4 Blindajes...");
    const campaignResult = await customer.campaigns.create([
      {
        name: `Search - Bóveda WhatsApp (Intención B2B)`,
        advertising_channel_type: 'SEARCH',
        status: 'ENABLED',
        campaign_budget: budgetResourceName,
        contains_eu_political_advertising: 'DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING',
        manual_cpc: {
          enhanced_cpc_enabled: false,
        },
        network_settings: {
          target_google_search: true,
          target_search_network: false,
          target_content_network: false,
          target_partner_search_network: false,
        },
        geo_target_type_setting: {
          positive_geo_target_type: 'PRESENCE',
        },
      },
    ]);
    const campaignResourceName = campaignResult.results[0].resource_name;
    const campaignId = campaignResourceName.split('/').pop();
    console.log(`✅ Campaña creada exitosamente! ID: ${campaignId} (${campaignResourceName})`);

    console.log("\n🚀 3. Asignando Segmentación Geográfica (Perú)...");
    await customer.campaignCriteria.create([
      {
        campaign: campaignResourceName,
        location: {
          geo_target_constant: 'geoTargetConstants/2604', // Perú
        },
      },
    ]);
    console.log("✅ Ubicación Perú (geoTargetConstants/2604) asignada!");

    console.log("\n🚀 4. Creando Grupo de Anuncios: 'Cierre de Ventas WhatsApp'...");
    const adGroupResult = await customer.adGroups.create([
      {
        name: 'Cierre de Ventas WhatsApp',
        campaign: campaignResourceName,
        status: 'ENABLED',
        type: 'SEARCH_STANDARD',
        cpc_bid_micros: 1500000, // S/ 1.50 PEN
      },
    ]);
    const adGroupResourceName = adGroupResult.results[0].resource_name;
    console.log(`✅ Grupo de anuncios creado: ${adGroupResourceName}`);

    console.log("\n🚀 5. Inyectando Palabras Clave de Alta Intención (Frase y Exacta)...");
    const keywords = [
      { text: 'como vender por whatsapp', match_type: 'PHRASE' },
      { text: 'plantillas de ventas por whatsapp', match_type: 'PHRASE' },
      { text: 'guiones de venta whatsapp', match_type: 'PHRASE' },
      { text: 'respuestas objeciones ventas', match_type: 'PHRASE' },
      { text: 'script de ventas whatsapp', match_type: 'PHRASE' },
      { text: 'plantillas respuestas whatsapp', match_type: 'EXACT' },
    ];

    await customer.adGroupCriteria.create(
      keywords.map(kw => ({
        ad_group: adGroupResourceName,
        status: 'ENABLED',
        keyword: {
          text: kw.text,
          match_type: kw.match_type,
        },
      }))
    );
    console.log(`✅ ${keywords.length} palabras clave de intención asignadas!`);

    console.log("\n🚀 6. Inyectando Lista de Palabras Clave Negativas (Filtro Anti-Gratis)...");
    const negatives = [
      'gratis',
      'free',
      'descargar gratis',
      'pdf gratis',
      'ejemplo gratis',
      'plantillas gratis',
      'curso gratis',
      'empleo',
      'trabajo',
      'que es',
      'definicion',
    ];

    await customer.campaignCriteria.create(
      negatives.map(neg => ({
        campaign: campaignResourceName,
        negative: true,
        keyword: {
          text: neg,
          match_type: 'BROAD',
        },
      }))
    );
    console.log(`✅ ${negatives.length} palabras clave negativas asignadas a la campaña!`);

    console.log("\n🚀 7. Creando Anuncio Adaptable de Búsqueda (RSA)...");
    await customer.adGroupAds.create([
      {
        ad_group: adGroupResourceName,
        status: 'ENABLED',
        ad: {
          final_urls: ['https://boveda.thequantpartners.com/'],
          responsive_search_ad: {
            headlines: [
              { text: 'Bóveda Guiones WhatsApp' },
              { text: 'Cierra Ventas Sin Pelear Precio' },
              { text: 'Solo S/ 29 - Acceso De Por Vida' },
              { text: '60+ Plantillas Cierre en Perú' },
              { text: 'Responde "Está Caro" en 5 seg' },
            ],
            descriptions: [
              { text: 'Deja de perder clientes en visto. Copia y pega guiones probados para cerrar en WhatsApp.' },
              { text: 'Manual B2B para emprendedores y vendedores en Perú. Descarga inmediata por S/ 29 PEN.' },
              { text: 'Supera objeciones de precio y mantén el control de tus ventas. Sin mensualidades.' },
              { text: 'Incluye 3 bonos exclusivos de seguimiento. 100% pago único con Mercado Pago.' },
            ],
          },
        },
      },
    ]);
    console.log("✅ Anuncio Adaptable de Búsqueda (RSA) creado exitosamente!");

    console.log("\n==================================================");
    console.log("🎉 CAMPAÑA GOOGLE SEARCH CREADA E INICIALIZADA EXITOSAMENTE");
    console.log("==================================================\n");

  } catch (err) {
    console.error("❌ Error al crear la campaña de búsqueda:", JSON.stringify(err, null, 2));
  }
}

main();

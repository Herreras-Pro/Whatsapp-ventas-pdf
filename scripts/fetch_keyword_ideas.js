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
    console.log("🔍 Consultando el Planificador de Palabras Clave de Google Ads para Perú...");
    
    // Query Keyword Ideas using KeywordPlanIdeaService
    const keywordIdeas = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: childCustomerId,
      language: 'languageConstants/1003', // Spanish
      geo_target_constants: ['geoTargetConstants/2604'], // Peru
      keyword_plan_network: 'GOOGLE_SEARCH',
      keywords: [
        'plantillas whatsapp ventas',
        'guiones de venta whatsapp',
        'como vender por whatsapp',
        'respuestas objeciones ventas'
      ],
    });

    console.log('\n==================================================');
    console.log('💡 IDEAS Y VOLUMEN DE BÚSQUEDA (KEYWORD PLANNER)');
    console.log('==================================================');

    if (!keywordIdeas || keywordIdeas.length === 0) {
      console.log('No se obtuvieron ideas directas o la respuesta vino vacía.');
    } else {
      keywordIdeas.slice(0, 15).forEach((idea, idx) => {
        const text = idea.text;
        const metrics = idea.keyword_idea_metrics || {};
        const avgMonthlySearches = metrics.monthly_search_volume || 'N/A';
        const competition = metrics.competition || 'N/A';
        const lowTopBid = metrics.low_top_of_page_bid_micros ? (metrics.low_top_of_page_bid_micros / 1000000).toFixed(2) : 'N/A';
        const highTopBid = metrics.high_top_of_page_bid_micros ? (metrics.high_top_of_page_bid_micros / 1000000).toFixed(2) : 'N/A';

        console.log(`${idx + 1}. "${text}"`);
        console.log(`   Búsquedas Mensuales Promedio: ${avgMonthlySearches}`);
        console.log(`   Competencia: ${competition}`);
        console.log(`   Oferta Parte Superior (Baja): S/ ${lowTopBid} PEN | (Alta): S/ ${highTopBid} PEN`);
        console.log('--------------------------------------------------');
      });
    }

  } catch (err) {
    console.error('❌ Error consultando el Keyword Planner:', err.message || (err.errors && err.errors[0]) || err);
  }
}

main();

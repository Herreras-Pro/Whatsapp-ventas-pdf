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
    const dailyMetrics = await customer.query(`
      SELECT 
        campaign.id,
        campaign.name,
        segments.date,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros
      FROM campaign
      WHERE campaign.id = '24073229418' AND segments.date >= '2026-01-01' AND segments.date <= '2026-12-31'
      ORDER BY segments.date ASC
    `);

    console.log('\n📅 HISTORIAL DE MÉTRICAS DIARIAS (TODO EL AÑO):');
    dailyMetrics.forEach(m => {
      console.log(`Fecha: ${m.segments.date} | Impresiones: ${m.metrics.impressions} | Clics: ${m.metrics.clicks} | Costo: S/ ${(m.metrics.cost_micros/1000000).toFixed(2)}`);
    });

  } catch (err) {
    console.error('❌ Error:', err.message || err);
  }
}

main();

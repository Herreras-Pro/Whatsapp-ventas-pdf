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

const managerCustomerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '');

const managerCustomer = client.Customer({
  customer_id: managerCustomerId,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

async function main() {
  try {
    console.log(`📡 Conectado exitosamente a la Google Ads API! (MCC Manager ID: ${managerCustomerId})`);
    
    // Query child accounts under this manager account
    const clientAccounts = await managerCustomer.query(`
      SELECT 
        customer_client.client_customer,
        customer_client.descriptive_name,
        customer_client.id,
        customer_client.status,
        customer_client.manager
      FROM customer_client
      WHERE customer_client.status = 'ENABLED'
    `);

    console.log('\n==================================================');
    console.log('📊 REPORTES DE CUENTAS PUBLICITARIAS Y CAMPAÑAS');
    console.log('==================================================');

    let totalCampaignsFound = 0;

    for (const acc of clientAccounts) {
      if (acc.customer_client.manager) continue; // Skip child managers

      const childId = acc.customer_client.id;
      const childName = acc.customer_client.descriptive_name || `Cuenta ${childId}`;
      
      console.log(`\n📂 Cuenta Publicitaria: ${childName} (ID: ${childId})`);

      const childCustomer = client.Customer({
        customer_id: String(childId),
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
        login_customer_id: managerCustomerId,
      });

      try {
        const campaigns = await childCustomer.query(`
          SELECT 
            campaign.id, 
            campaign.name, 
            campaign.status,
            metrics.impressions, 
            metrics.clicks, 
            metrics.cost_micros,
            metrics.conversions
          FROM campaign
          WHERE campaign.status != 'REMOVED'
        `);

        if (campaigns.length === 0) {
          console.log('   (Sin campañas activas en esta cuenta)');
        } else {
          totalCampaignsFound += campaigns.length;
          campaigns.forEach(c => {
            const costPEN = (c.metrics.cost_micros / 1000000).toFixed(2);
            console.log(`   🔹 Campaña: ${c.campaign.name} (ID: ${c.campaign.id})`);
            console.log(`      Estado: ${c.campaign.status}`);
            console.log(`      Impresiones: ${c.metrics.impressions}`);
            console.log(`      Clics: ${c.metrics.clicks}`);
            console.log(`      Costo Total: S/ ${costPEN} PEN`);
            console.log(`      Conversiones (Compras): ${c.metrics.conversions}`);
          });
        }
      } catch (err) {
        console.log(`   ⚠️ No se pudieron extraer métricas de esta sub-cuenta: ${err.message || err}`);
      }
    }

    console.log('\n==================================================\n');
  } catch (error) {
    console.error('❌ Error consultando la API:', error.message || error);
  }
}

main();

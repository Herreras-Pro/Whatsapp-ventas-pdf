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
    console.log(`📡 Consultando acciones de conversión y Píxel de Google Ads (Cuenta: ${childCustomerId})...`);
    
    // 1. Query Conversion Actions registered in Google Ads
    const conversionActions = await customer.query(`
      SELECT 
        conversion_action.id, 
        conversion_action.name, 
        conversion_action.type, 
        conversion_action.status,
        conversion_action.primary_for_goal
      FROM conversion_action
      WHERE conversion_action.status = 'ENABLED'
    `);

    console.log('\n==================================================');
    console.log('🎯 ACCIONES DE CONVERSIÓN CONFIGURADAS EN GOOGLE TAG');
    console.log('==================================================');

    if (conversionActions.length === 0) {
      console.log('No se encontraron acciones de conversión configuradas.');
    } else {
      conversionActions.forEach(ca => {
        console.log(`🔹 Evento: ${ca.conversion_action.name} (ID: ${ca.conversion_action.id})`);
        console.log(`   Tipo: ${ca.conversion_action.type}`);
        console.log(`   Primaria para objetivo: ${ca.conversion_action.primary_for_goal}`);
      });
    }

    // 2. Query ad group / campaign conversion stats by conversion action
    const conversionStats = await customer.query(`
      SELECT
        segments.conversion_action_name,
        metrics.conversions,
        metrics.all_conversions,
        metrics.conversions_value
      FROM campaign
      WHERE campaign.status = 'ENABLED'
    `);

    console.log('\n==================================================');
    console.log('📈 EVENTOS Y CONVERSIONES REGISTRADAS HOY');
    console.log('==================================================');

    if (conversionStats.length === 0) {
      console.log('Aún no hay registros de eventos en esta ventana de tiempo.');
    } else {
      conversionStats.forEach(cs => {
        if (cs.metrics.all_conversions > 0 || cs.metrics.conversions > 0) {
          console.log(`🔹 Acción: ${cs.segments.conversion_action_name || 'General'}`);
          console.log(`   Conversiones Principales: ${cs.metrics.conversions}`);
          console.log(`   Todas las Conversiones: ${cs.metrics.all_conversions}`);
          console.log(`   Valor Generado: S/ ${cs.metrics.conversions_value} PEN`);
        }
      });
    }

    console.log('\n==================================================\n');
  } catch (error) {
    console.error('❌ Error consultando conversiones:', error.message || error);
  }
}

main();

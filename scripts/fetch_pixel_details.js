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
    console.log("=== 1. TODAS LAS ACCIONES DE CONVERSIÓN EN LA CUENTA ===");
    const conversionActions = await customer.query(`
      SELECT 
        conversion_action.id, 
        conversion_action.name, 
        conversion_action.type, 
        conversion_action.status,
        conversion_action.category,
        conversion_action.primary_for_goal,
        conversion_action.counting_type
      FROM conversion_action
    `);
    console.log(JSON.stringify(conversionActions, null, 2));

    console.log("\n=== 2. MÉTRICAS SEGMENTADAS POR ACCIÓN DE CONVERSIÓN ===");
    const segMetrics = await customer.query(`
      SELECT 
        segments.conversion_action,
        segments.conversion_action_name,
        segments.conversion_action_category,
        metrics.conversions,
        metrics.all_conversions,
        metrics.conversions_value,
        metrics.all_conversions_value
      FROM campaign
      WHERE campaign.id = '24073229418' AND segments.date DURING LAST_30_DAYS
    `);
    console.log(JSON.stringify(segMetrics, null, 2));

    console.log("\n=== 3. LISTAS DE AUDIENCIA / PÍXEL (USER LISTS) ===");
    const userLists = await customer.query(`
      SELECT 
        user_list.id,
        user_list.name,
        user_list.type,
        user_list.size_for_search,
        user_list.size_for_display,
        user_list.membership_status
      FROM user_list
    `);
    console.log(JSON.stringify(userLists, null, 2));

  } catch (err) {
    console.error("❌ Error consultando la API:", err.message || err);
  }
}

main();

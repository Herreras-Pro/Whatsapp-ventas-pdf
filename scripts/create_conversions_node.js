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
    console.log('🚀 Creando Audiencia de Remarketing (UserList rule_based)...');
    const userListResult = await customer.userLists.create([
      {
        name: 'Visitantes Bóveda WhatsApp (30 días)',
        description: 'Audiencia de remarketing acumulada automáticamente por la etiqueta AW-3160406729',
        membership_life_span: 30,
        membership_status: 'OPEN',
        rule_based_user_list: {
          prepopulation_status: 'REQUESTED',
          expression_rule_user_list: {
            rule: {
              rule_item_groups: [
                {
                  rule_items: [
                    {
                      name: 'url__',
                      string_rule_item: {
                        operator: 'CONTAINS',
                        value: 'boveda',
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    ]);
    console.log('✅ Audiencia de Remarketing creada:', JSON.stringify(userListResult, null, 2));
  } catch (err) {
    console.error('⚠️ Error al crear lista de audiencia:', err.message || (err.errors && err.errors[0]) || err);
  }
}

main();

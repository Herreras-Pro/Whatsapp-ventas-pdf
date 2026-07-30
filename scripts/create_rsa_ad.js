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

const adGroupResourceName = 'customers/4433232603/adGroups/196004928382';

async function main() {
  try {
    console.log("🚀 Creando Anuncio Adaptable de Búsqueda (RSA) con Titulares <= 30 caracteres...");
    
    const headlines = [
      'Bóveda Guiones WhatsApp',        // 23 chars
      'Cierra Ventas Sin Fricción',     // 26 chars
      'Solo S/ 29 - Acceso Por Vida',   // 28 chars
      '60+ Plantillas Cierre Perú',     // 26 chars
      'Responde Objeciones en 5s',      // 25 chars
    ];

    const descriptions = [
      'Deja de perder clientes en visto. Copia y pega guiones probados para cerrar en WhatsApp.',
      'Manual B2B para emprendedores y vendedores en Perú. Descarga inmediata por S/ 29 PEN.',
      'Supera objeciones de precio y mantén el control de tus ventas. Sin mensualidades.',
      'Incluye 3 bonos exclusivos de seguimiento. 100% pago único con Mercado Pago.',
    ];

    const result = await customer.adGroupAds.create([
      {
        ad_group: adGroupResourceName,
        status: 'ENABLED',
        ad: {
          final_urls: ['https://boveda.thequantpartners.com/'],
          responsive_search_ad: {
            headlines: headlines.map(h => ({ text: h })),
            descriptions: descriptions.map(d => ({ text: d })),
          },
        },
      },
    ]);

    console.log("✅ Anuncio RSA Creado Exitosamente!");
    console.log(JSON.stringify(result, null, 2));

  } catch (err) {
    console.error("❌ Error al crear el anuncio RSA:", JSON.stringify(err, null, 2));
  }
}

main();

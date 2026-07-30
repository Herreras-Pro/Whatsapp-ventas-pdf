import os, sys, json, urllib.request, urllib.parse

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

# Load credentials from .env.local
env = {}
env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                env[k] = v.strip("'\"")

CLIENT_ID = env.get('GOOGLE_ADS_CLIENT_ID')
CLIENT_SECRET = env.get('GOOGLE_ADS_CLIENT_SECRET')
REFRESH_TOKEN = env.get('GOOGLE_ADS_REFRESH_TOKEN')
DEVELOPER_TOKEN = env.get('GOOGLE_ADS_DEVELOPER_TOKEN')
MANAGER_ID = env.get('GOOGLE_ADS_CUSTOMER_ID', '').replace('-', '')
CHILD_ID = '4433232603'  # Account ID

def get_access_token():
    url = "https://oauth2.googleapis.com/token"
    data = urllib.parse.urlencode({
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'refresh_token': REFRESH_TOKEN,
        'grant_type': 'refresh_token'
    }).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            return res['access_token']
    except Exception as e:
        print("OAuth Error:", e)
        return None

token = get_access_token()
if not token:
    print("Error de autenticacion OAuth.")
    sys.exit(1)

headers = {
    'Authorization': f'Bearer {token}',
    'developer-token': DEVELOPER_TOKEN,
    'login-customer-id': MANAGER_ID,
    'Content-Type': 'application/json'
}

# 1. Crear Accion de Conversion: begin_checkout
conversion_url = f"https://googleads.googleapis.com/v17/customers/{CHILD_ID}/conversionActions:mutate"
conversion_payload = {
    "operations": [
        {
            "create": {
                "name": "Inicio de Pago (begin_checkout)",
                "category": "BEGIN_CHECKOUT",
                "type": "WEBPAGE",
                "status": "ENABLED",
                "primary_for_goal": False,
                "value_settings": {
                    "default_value": 29.0,
                    "default_currency_code": "PEN",
                    "always_use_default_value": False
                }
            }
        }
    ]
}

print("1. Creando Accion de Conversion: Inicio de Pago (begin_checkout)...")
req = urllib.request.Request(conversion_url, data=json.dumps(conversion_payload).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        print("SUCCESS: Accion de conversion creada exitosamente!")
        print(json.dumps(res, indent=2))
except urllib.error.HTTPError as e:
    print("HTTP Error en Conversion:", e.code, e.read().decode('utf-8'))
except Exception as e:
    print("Error en Conversion:", e)

# 2. Crear Lista de Audiencia de Remarketing (UserList)
userlist_url = f"https://googleads.googleapis.com/v17/customers/{CHILD_ID}/userLists:mutate"
userlist_payload = {
    "operations": [
        {
            "create": {
                "name": "Visitantes Boveda WhatsApp (30 dias)",
                "description": "Audiencia de remarketing acumulada automaticamente por la etiqueta AW-3160406729",
                "membership_life_span": 30,
                "membership_status": "OPEN",
                "expression_rule_user_list": {
                    "rule": {
                        "rule_item_groups": [
                            {
                                "rule_items": [
                                    {
                                        "name": "url__",
                                        "string_rule_item": {
                                            "operator": "CONTAINS",
                                            "value": "boveda"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    ]
}

print("\n2. Creando Lista de Audiencia de Remarketing...")
req = urllib.request.Request(userlist_url, data=json.dumps(userlist_payload).encode('utf-8'), headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        print("SUCCESS: Audiencia de Remarketing creada exitosamente!")
        print(json.dumps(res, indent=2))
except urllib.error.HTTPError as e:
    print("HTTP Error en Audiencia:", e.code, e.read().decode('utf-8'))
except Exception as e:
    print("Error en Audiencia:", e)

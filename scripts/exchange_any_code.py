import os, sys, json, urllib.parse, urllib.request

env = {}
env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                env[k] = v.strip("'\"")

CLIENT_ID = env.get('GOOGLE_ADS_CLIENT_ID', '')
CLIENT_SECRET = env.get('GOOGLE_ADS_CLIENT_SECRET', '')

def main():
    if len(sys.argv) < 2:
        print("Uso: python exchange_any_code.py <code_or_refresh_token> [redirect_uri]")
        sys.exit(1)

    val = sys.argv[1]
    redirect_uri = sys.argv[2] if len(sys.argv) > 2 else "urn:ietf:wg:oauth:2.0:oob"

    if val.startswith("1//"):
        refresh_token = val
        print("Refresh token directo recibido:", refresh_token[:15] + "...")
    else:
        print("Canjeando código por Refresh Token...")
        token_url = "https://oauth2.googleapis.com/token"
        data = urllib.parse.urlencode({
            'code': val,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }).encode('utf-8')

        req = urllib.request.Request(token_url, data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
        try:
            with urllib.request.urlopen(req) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                refresh_token = res.get('refresh_token')
                print("REFRESH TOKEN EXITOSO:", refresh_token)
        except Exception as e:
            if hasattr(e, 'read'):
                print("Error respuesta:", e.read().decode())
            else:
                print("Error:", e)
            return

    if refresh_token:
        print("\nVerificando conectividad con Google Ads API...")
        dev_token = env.get('GOOGLE_ADS_DEVELOPER_TOKEN', '')
        customer_id = env.get('GOOGLE_ADS_CUSTOMER_ID', '').replace('-', '')
        
        url = f"https://googleads.googleapis.com/v17/customers/{customer_id}/googleAds:searchStream"
        headers = {
            'developer-token': dev_token,
            'Content-Type': 'application/json'
        }
        
        token_url = "https://oauth2.googleapis.com/token"
        data = urllib.parse.urlencode({
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'refresh_token': refresh_token,
            'grant_type': 'refresh_token'
        }).encode('utf-8')
        req = urllib.request.Request(token_url, data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
        with urllib.request.urlopen(req) as resp:
            access_token = json.loads(resp.read().decode('utf-8'))['access_token']

        headers['Authorization'] = f'Bearer {access_token}'
        query_payload = {"query": "SELECT customer.id, customer.descriptive_name FROM customer LIMIT 1"}
        req = urllib.request.Request(url, data=json.dumps(query_payload).encode('utf-8'), headers=headers)
        try:
            with urllib.request.urlopen(req) as resp:
                print("✅ Conexión exitosa a Google Ads API!")
                print(resp.read().decode('utf-8'))
        except Exception as e:
            if hasattr(e, 'read'):
                print("Error API:", e.read().decode())
            else:
                print("Error API:", e)

if __name__ == '__main__':
    main()

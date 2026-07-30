import os, sys, json, urllib.request, urllib.parse

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
CUSTOMER_ID = env.get('GOOGLE_ADS_CUSTOMER_ID', '').replace('-', '')

print(f"Customer ID: {CUSTOMER_ID}")
print(f"Developer Token: {DEVELOPER_TOKEN[:10]}...")

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
        if hasattr(e, 'read'):
            print("OAuth Error:", e.read().decode())
        else:
            print("OAuth Error:", e)
        return None

token = get_access_token()
if token:
    print("Successfully connected to Google OAuth! Token active.")
else:
    print("Token expired or invalid.")

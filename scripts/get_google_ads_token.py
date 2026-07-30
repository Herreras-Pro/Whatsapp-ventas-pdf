import os, sys, json, urllib.parse, urllib.request, http.server, socketserver, webbrowser

env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
env = {}
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                env[k] = v.strip("'\"")

CLIENT_ID = env.get('GOOGLE_ADS_CLIENT_ID')
CLIENT_SECRET = env.get('GOOGLE_ADS_CLIENT_SECRET')

print(f"Client ID: {CLIENT_ID}")

# Strategy: Prompt user to enter auth code or use OAuth Playground with default Google credentials
def exchange_code(code, redirect_uri):
    url = "https://oauth2.googleapis.com/token"
    data = urllib.parse.urlencode({
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri
    }).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            return res
    except Exception as e:
        if hasattr(e, 'read'):
            print("Exchange Error:", e.read().decode())
        else:
            print("Exchange Error:", e)
        return None

if __name__ == '__main__':
    if len(sys.argv) > 1:
        code = sys.argv[1]
        redirect_uri = sys.argv[2] if len(sys.argv) > 2 else "https://developers.google.com/oauthplayground"
        res = exchange_code(code, redirect_uri)
        if res and 'refresh_token' in res:
            print("NEW_REFRESH_TOKEN=" + res['refresh_token'])
        elif res and 'access_token' in res:
            print("NEW_ACCESS_TOKEN=" + res['access_token'])

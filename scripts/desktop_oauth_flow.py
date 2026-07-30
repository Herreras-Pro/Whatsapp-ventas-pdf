import os, sys, json, urllib.parse, urllib.request, http.server, socketserver, webbrowser

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
PORT = 80
REDIRECT_URI = "http://localhost"

auth_code = None

class OAuthHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        query = urllib.parse.urlparse(self.path).query
        params = urllib.parse.parse_qs(query)
        if 'code' in params:
            auth_code = params['code'][0]
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write("<h1>¡Autorización Exitosa!</h1><p>Puedes cerrar esta ventana y regresar a la consola.</p>".encode('utf-8'))
        else:
            self.send_response(400)
            self.end_headers()

def main():
    global auth_code
    auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth?"
        + urllib.parse.urlencode({
            'client_id': CLIENT_ID,
            'redirect_uri': REDIRECT_URI,
            'response_type': 'code',
            'scope': 'https://www.googleapis.com/auth/adwords',
            'access_type': 'offline',
            'prompt': 'consent'
        })
    )

    print(f"Abriendo navegador en: {auth_url}")
    webbrowser.open(auth_url)

    with socketserver.TCPServer(("", PORT), OAuthHandler) as httpd:
        print(f"Esperando redirección en {REDIRECT_URI} (Puerto {PORT})...")
        while not auth_code:
            httpd.handle_request()

    print(f"\n¡Código de autorización capturado con éxito!: {auth_code}\n")
    
    print("Canjeando código por Refresh Token...")
    token_url = "https://oauth2.googleapis.com/token"
    data = urllib.parse.urlencode({
        'code': auth_code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code'
    }).encode('utf-8')
    
    req = urllib.request.Request(token_url, data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            print("=== REFRESH TOKEN OBTENIDO ===")
            print("REFRESH TOKEN:", res.get('refresh_token'))
            print("ACCESS TOKEN:", res.get('access_token'))
    except Exception as e:
        print("Error obteniendo token:", e)

if __name__ == '__main__':
    main()

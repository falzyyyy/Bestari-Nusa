import requests
import json

url = "https://wbvypambcbvvnpmkzegv.supabase.co"
# Read env key from env file or just use the one in .env.local
anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidnlwYW1iY2J2dm5wbWt6ZWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MjY3NjcsImV4cCI6MjA5NzAwMjc2N30.XgGTpm3qzIwfzAut4tQ-xcKrLaH1C1YYlfMOibB7Te0"

headers = {
    "apikey": anon_key,
    "Authorization": f"Bearer {anon_key}"
}

# Get a single row or structure
for table in ["team_members", "programs", "partners", "impact_metrics"]:
    r = requests.get(f"{url}/rest/v1/{table}?limit=1", headers=headers)
    print(f"Table {table} status: {r.status_code}")
    if r.status_code == 200:
        data = r.json()
        if data:
            print(f"Columns for {table}: {list(data[0].keys())}")
        else:
            print(f"Table {table} is empty. Let's try options...")
            r_opts = requests.options(f"{url}/rest/v1/{table}", headers=headers)
            print(f"Options for {table}: {r_opts.headers.get('Allow', '')}")

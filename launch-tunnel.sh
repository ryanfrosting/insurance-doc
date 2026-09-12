#!/usr/bin/env bash
set -e

echo "=== 1. Installing dependencies ==/==="
npm install

echo "=== 2. Building application ==="
npm run build

echo "=== 3. Checking for cloudflared ==="
if ! command -v cloudflared &> /dev/null; then
    echo "cloudflared not found. Installing cloudflared..."
    # Download and install cloudflared for Linux x86_64
    curl -L --output cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
    chmod +x cloudflared
    sudo mv cloudflared /usr/local/bin/cloudflared || mv cloudflared ./cloudflared-bin
    CLOUD_BIN="./cloudflared-bin"
else
    CLOUD_BIN="cloudflared"
fi

echo "=== 4. Starting application server on port 3000 ==="
npm start &
SERVER_PID=$!

# Wait for server to boot
sleep 2

echo "=== 5. Launching Cloudflare Try (Quick Tunnel) ==="
echo "Your app is now being exposed via Cloudflare Quick Tunnel (no auth required)."
if [ "$CLOUD_BIN" = "./cloudflared-bin" ]; then
    ./cloudflared-bin tunnel --url http://localhost:3000
else
    cloudflared tunnel --url http://localhost:3000
fi

# Cleanup on exit
kill $SERVER_PID

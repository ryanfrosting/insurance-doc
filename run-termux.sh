#!/bin/bash

# Termux + Cloudflare Setup & Runner Script

echo "==================================================="
echo "🚀 Starting Termux Deployment with trycloudflare 🚀"
echo "==================================================="

# 1. Ensure we have the right packages if running inside Termux
if [ -n "$PREFIX" ] && [ -x "$PREFIX/bin/pkg" ]; then
    echo "📱 Termux environment detected!"
    echo "📦 Ensuring 'nodejs' and 'cloudflared' are installed..."
    pkg update -y
    pkg install nodejs cloudflared -y
else
    echo "⚠️  Not running in Termux (or pkg not found). Skipping package manager updates."
    echo "Ensure you have Node.js and cloudflared installed manually."
fi

# 2. Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# 3. Build the application
echo "🏗️ Building the application for production..."
npm run build

# 4. Start the application in the background
echo "🟢 Starting the local server on port 3000..."
# Kill any existing instance running on the port just in case
pkill -f "node dist/server.cjs" || true
npm start &
SERVER_PID=$!

# Wait a moment to ensure the server is up
sleep 3

echo "==================================================="
echo "🌐 Launching Cloudflare Tunnel (trycloudflare)..."
echo "==================================================="
echo "When the tunnel starts, look for the URL ending in '.trycloudflare.com'"
echo "Press Ctrl+C to stop the server and tunnel."
echo "==================================================="

# 5. Launch Cloudflare Tunnel to expose localhost:3000
cloudflared tunnel --url http://localhost:3000

# Cleanup trap when the user presses Ctrl+C
trap "echo '🛑 Stopping server...'; kill $SERVER_PID; exit 0" SIGINT SIGTERM

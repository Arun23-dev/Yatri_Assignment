#!/bin/bash

echo "🚀 Starting YatriTask Monorepo Applications..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use. Killing existing process..."
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 2
    fi
}

# Check and clear ports
check_port 3001
check_port 5000

echo "📦 Building applications..."
npm run build:hub
npm run build:wallet

echo "🔧 Starting Wallet App (gRPC Service) on port 5000..."
cd apps/wallet && npm run start &
WALLET_PID=$!

echo "⏳ Waiting for Wallet app to start..."
sleep 5

echo "🏠 Starting Hub App (REST API) on port 3001..."
cd ../hub && npm run start &
HUB_PID=$!

echo "⏳ Waiting for Hub app to start..."
sleep 5

echo ""
echo "✅ Both applications are now running!"
echo ""
echo "📊 Application Status:"
echo "   🏠 Hub App (REST API): http://localhost:3001"
echo "   📚 Swagger Docs: http://localhost:3001/api"
echo "   💰 Wallet App (gRPC): localhost:5000"
echo ""
echo "🔑 Create initial admin user:"
echo "   cd apps/hub && npm run create-admin"
echo ""
echo "🛑 To stop both applications, press Ctrl+C"
echo ""

# Wait for user to stop
wait

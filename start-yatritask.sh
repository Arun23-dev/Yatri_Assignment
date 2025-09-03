#!/bin/bash

# YatriTask Startup Script
# This script sets up and starts both Hub and Wallet applications

echo "🚴‍♂️ Starting YatriTask Bike Rental Management System..."

# Check if MongoDB is running
echo "📊 Checking MongoDB status..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    exit 1
fi
echo "✅ MongoDB is running"

# Kill any existing processes on our ports
echo "🔧 Cleaning up existing processes..."
sudo lsof -ti:3001 | xargs kill -9 2>/dev/null || true
sudo lsof -ti:5000 | xargs kill -9 2>/dev/null || true
echo "✅ Ports cleared"

# Build both applications
echo "🔨 Building applications..."
cd apps/hub && npm run build
cd ../wallet && npm run build
cd ../..
echo "✅ Applications built"

# Generate Prisma clients
echo "🗄️ Setting up database..."
cd apps/hub && npx prisma generate
cd ../wallet && npx prisma generate
cd ../..
echo "✅ Prisma clients generated"

# Push database schemas
echo "📋 Pushing database schemas..."
cd apps/hub && npx prisma db push
cd ../wallet && npx prisma db push
cd ../..
echo "✅ Database schemas pushed"

# Create initial admin if not exists
echo "👤 Setting up initial admin..."
cd apps/hub && npx ts-node scripts/create-admin.ts
cd ../..
echo "✅ Admin setup complete"

# Seed sample data
echo "🌱 Seeding sample data..."
cd apps/hub && npx ts-node scripts/index.ts
cd ../..
echo "✅ Sample data seeded"

# Start both applications
echo "🚀 Starting applications..."
echo "📱 Hub API will be available at: http://localhost:3001"
echo "📚 Swagger docs will be available at: http://localhost:3001/api"
echo "💰 Wallet gRPC will be available at: localhost:5000"
echo ""
echo "👤 Default Admin: admin@yatritask.com / admin123"
echo "👤 Sample Customer: john.customer@example.com / customer123"
echo ""

# Start both apps in background
npm run start:both &

echo "🎉 YatriTask is now running!"
echo "Press Ctrl+C to stop all applications"
echo ""

# Wait for user to stop
wait

#!/bin/bash

echo "🚀 Deploying Tap2Earn Game..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy .env.example to .env and configure it."
    exit 1
fi

# Load environment variables
export $(cat .env | xargs)

# Check if bot token is set
if [ "$TELEGRAM_BOT_TOKEN" == "YOUR_BOT_TOKEN_HERE" ]; then
    echo "❌ Error: Please set your Telegram bot token in .env"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Start the application
echo "✅ Starting Tap2Earn bot..."
npm start
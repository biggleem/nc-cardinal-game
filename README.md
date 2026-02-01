# NC Blockchain Cardinal - Telegram Crypto Game 🔴🦅

A tap-to-earn game for Telegram featuring the NC Blockchain Cardinal mascot. Players tap the Cardinal to earn $CARD tokens!

## Features

- 🎯 **Tap to Earn** - Simple tap mechanics to earn coins
- ⚡ **Energy System** - Limited taps that regenerate over time
- 📈 **Upgrades** - Increase tap power, energy capacity, and regen rate
- 👥 **Referral System** - Earn coins by inviting friends
- 🏆 **Leaderboard** - Compete with other players
- 💎 **Web App** - Seamless Telegram Mini App integration

## Setup Instructions

### 1. Create a Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot`
3. Choose a name (e.g., "Tap2Earn Game")
4. Choose a username (e.g., `tap2earn_game_bot`)
5. Save the bot token

### 2. Configure the Bot

1. Still in BotFather, send `/mybots`
2. Select your bot
3. Click "Bot Settings"
4. Click "Menu Button"
5. Enter your webapp URL: `https://YOUR_DOMAIN.com/game.html`

### 3. Install Dependencies

```bash
cd tap-game
npm install
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add:
- Your bot token from BotFather
- Your webapp URL (use ngrok for testing)

### 5. Run Locally

```bash
# Start the bot and web server
npm start

# For development with auto-restart
npm run dev
```

### 6. Test with Ngrok (Local Development)

```bash
# Install ngrok
npm install -g ngrok

# In another terminal, expose your local server
ngrok http 3000
```

Copy the HTTPS URL and update your `.env` WEBAPP_URL.

## Monetization Options

### 1. Ad Integration
- Watch ads for bonus energy
- Daily ad rewards
- Ad-based coin multipliers

### 2. Premium Features
```javascript
// Add to bot.js
const premiumFeatures = {
  autoTapper: { price: 4.99, duration: '7d' },
  doubleCoins: { price: 2.99, duration: '24h' },
  unlimitedEnergy: { price: 9.99, duration: '30d' }
};
```

### 3. Token Integration (Future)

1. **Create Your Token**
   - Deploy on TON or Ethereum
   - Set conversion rate (e.g., 1000 coins = 1 TOKEN)

2. **Add Wallet Connection**
   ```javascript
   // Add TON Connect or Web3 integration
   const TonConnect = require('@tonconnect/sdk');
   ```

3. **Withdrawal System**
   - Minimum withdrawal amount
   - Transaction fees
   - Anti-fraud checks

## Deployment

### Option 1: Heroku (Free tier available)

```bash
# Install Heroku CLI
# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

### Option 2: VPS (DigitalOcean, AWS, etc.)

```bash
# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and run
git clone your-repo
cd tap-game
npm install
npm start
```

### Option 3: Vercel (For web app only)

Deploy the `public` folder to Vercel for the web interface.

## Next Steps

1. **Add Real Database**
   - MongoDB or PostgreSQL
   - Store user data persistently

2. **Payment Integration**
   - Telegram Stars
   - Crypto payments (TON, USDT)

3. **Anti-Cheat**
   - Rate limiting
   - Tap pattern detection
   - Server-side validation

4. **Social Features**
   - Clans/Teams
   - Daily tournaments
   - Chat integration

5. **Blockchain Integration**
   - Smart contract for token
   - On-chain leaderboard
   - NFT rewards

## Revenue Projections

With proper marketing:
- 10,000 users × 5% conversion × $5 average = $2,500/month
- Ad revenue: $0.01 per user per day × 10,000 = $3,000/month
- Token presale potential: $50,000+

## Marketing Tips

1. **Launch Strategy**
   - Post in Telegram crypto groups
   - Twitter/X announcements
   - Partner with influencers

2. **Retention**
   - Daily rewards
   - Limited-time events
   - Regular updates

3. **Viral Growth**
   - Strong referral rewards
   - Social sharing bonuses
   - Community challenges

## Support

Need help? Contact @yourtelegram

---

🚀 Ready to build your crypto empire? Start tapping!
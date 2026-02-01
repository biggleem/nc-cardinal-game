# 🚀 Launch NC Blockchain Cardinal Game

## Quick Start (5 minutes)

### 1. Create Telegram Bot
1. Open [@BotFather](https://t.me/BotFather)
2. Send `/newbot`
3. Name: `NC Blockchain Cardinal`
4. Username: `ncblockchain_game_bot` (or similar)
5. Copy the bot token

### 2. Set Up Locally
```bash
# 1. Navigate to game folder
cd tap-game

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env and add your bot token
# TELEGRAM_BOT_TOKEN=YOUR_TOKEN_HERE

# 5. Start the game
npm start
```

### 3. Test with Ngrok
```bash
# Install ngrok if needed
npm install -g ngrok

# In new terminal
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
```

### 4. Configure Bot
1. Go back to @BotFather
2. Send `/mybots`
3. Select your bot
4. Bot Settings → Menu Button
5. Enter URL: `https://YOUR_NGROK.ngrok.io/game.html`

### 5. Test Your Game!
- Open your bot in Telegram
- Send `/start`
- Click "🎮 Play Game"
- Tap the cardinal!

## Production Deployment

### Option A: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option B: Heroku
1. Create account at heroku.com
2. Install Heroku CLI
3. Deploy:
```bash
heroku create nc-blockchain-game
git push heroku main
```

### Option C: VPS (DigitalOcean/AWS)
```bash
# On your VPS
git clone YOUR_REPO
cd tap-game
npm install --production
pm2 start bot.js --name "nc-cardinal"
```

## Marketing Launch

### Week 1: Soft Launch
- Test with 10-20 users
- Fix any bugs
- Gather feedback

### Week 2: Community Launch
- Post in NC Blockchain groups
- Share on Twitter/X
- Create tutorial video

### Week 3: Growth
- Referral contest
- Daily rewards
- Leaderboard competition

### Week 4: Monetization
- Enable premium features
- Add $CARD token rewards
- Partner with NC projects

## Support Channels

- Telegram Group: @ncblockchain_community
- Discord: discord.gg/ncblockchain
- Twitter: @ncblockchain

Ready to launch! 🔴🦅
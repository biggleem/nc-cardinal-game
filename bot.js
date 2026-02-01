require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// Bot setup
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const webAppUrl = process.env.WEBAPP_URL || 'https://YOUR_DOMAIN.com';

const bot = new TelegramBot(token, { polling: true });
const app = express();

// In-memory database (replace with real DB in production)
const users = {};

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Bot commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username || 'Player';
  
  // Initialize user if new
  if (!users[userId]) {
    users[userId] = {
      username: username,
      balance: 0,
      totalTaps: 0,
      energy: 100,
      lastActive: Date.now(),
      referrals: 0,
      cardinalLevel: 1,
      achievements: [],
      upgrades: {
        tapPower: 1,
        energyMax: 100,
        regenRate: 1
      }
    };
  }
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{
          text: '🎮 Play Game',
          web_app: { url: webAppUrl + '/game.html' }
        }],
        [{
          text: '🦅 My Cardinal',
          callback_data: 'cardinal'
        },
        {
          text: '💰 Balance',
          callback_data: 'balance'
        }],
        [{
          text: '🏆 Achievements',
          callback_data: 'achievements'
        },
        {
          text: '📊 Leaderboard',
          callback_data: 'leaderboard'
        }],
        [{
          text: '👥 Invite Friends',
          callback_data: 'invite'
        },
        {
          text: '🔗 NC Blockchain',
          url: 'https://ncblockchain.com'
        }]
      ]
    }
  };
  
  bot.sendMessage(chatId, `
🔴 Welcome to NC Blockchain Cardinal Clicker!

Tap the Cardinal to earn $CARD tokens!

🦅 Cardinal Level: ${getCardinalName(users[userId].cardinalLevel)}
🪶 Current Balance: ${users[userId].balance} $CARD
⚡ Energy: ${users[userId].energy}/100
💪 Tap Power: ${users[userId].upgrades.tapPower}

Click "Play Game" to start earning!

Join the NC Blockchain community and help us grow! 🚀
`, keyboard);
});

// Get cardinal name by level
function getCardinalName(level) {
  const names = ['Baby Cardinal', 'Young Cardinal', 'Adult Cardinal', 'Elder Cardinal', 'Legendary Cardinal'];
  return names[level - 1] || 'Cardinal';
}

// Handle button callbacks
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;
  
  if (!users[userId]) {
    bot.sendMessage(chatId, 'Please start the bot first with /start');
    return;
  }
  
  switch(data) {
    case 'cardinal':
      const user = users[userId];
      const nextLevel = getNextCardinalRequirement(user.cardinalLevel);
      bot.sendMessage(chatId, `
🦅 Your Cardinal Status

Level: ${getCardinalName(user.cardinalLevel)} (Level ${user.cardinalLevel})
Total Taps: ${user.totalTaps}
Next Evolution: ${nextLevel ? `${nextLevel} taps` : 'MAX LEVEL'}

Each level increases your tap power and unlocks new features!
`);
      break;
      
    case 'balance':
      const userData = users[userId];
      bot.sendMessage(chatId, `
🦅 Your Balance

$CARD Tokens: ${userData.balance}
Total Taps: ${userData.totalTaps}
Energy: ${userData.energy}/${userData.upgrades.energyMax}
Tap Power: ${userData.upgrades.tapPower}
Referrals: ${userData.referrals}
Cardinal Level: ${getCardinalName(userData.cardinalLevel)}
`);
      break;
      
    case 'achievements':
      const userAchievements = users[userId].achievements || [];
      const achievementList = userAchievements.length > 0 
        ? userAchievements.map(a => `✅ ${a}`).join('\n')
        : 'No achievements yet! Keep playing to unlock them.';
      
      bot.sendMessage(chatId, `
🏆 Your Achievements

${achievementList}

Complete challenges to earn bonus $CARD tokens!
`);
      break;
      
    case 'invite':
      const inviteLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;
      bot.sendMessage(chatId, `
👥 Invite Friends to NC Blockchain!

Share your referral link and earn 100 $CARD for each friend:
${inviteLink}

Total referrals: ${users[userId].referrals}

Help grow the NC Blockchain community! 🔴

Share in:
🐦 Twitter: @ncblockchain
💬 Telegram: @ncblockchain
💻 Discord: discord.gg/ncblockchain
`);
      break;
      
    case 'leaderboard':
      const topUsers = Object.entries(users)
        .sort((a, b) => b[1].balance - a[1].balance)
        .slice(0, 10)
        .map((u, i) => `${i+1}. @${u[1].username}: ${u[1].balance} $CARD (${getCardinalName(u[1].cardinalLevel)})`)
        .join('\n');
      
      bot.sendMessage(chatId, `
🏆 Top Cardinals

${topUsers}

Compete to become the top Cardinal in NC!
`);
      break;
  }
  
  bot.answerCallbackQuery(callbackQuery.id);
});

// Get next cardinal level requirement
function getNextCardinalRequirement(currentLevel) {
  const requirements = [0, 1000, 10000, 50000, 100000];
  return requirements[currentLevel] || null;
}

// API endpoints for the web app
app.post('/api/tap', (req, res) => {
  const { userId, amount } = req.body;
  
  if (!users[userId]) {
    return res.json({ success: false, error: 'User not found' });
  }
  
  const user = users[userId];
  
  // Check energy
  if (user.energy < amount) {
    return res.json({ success: false, error: 'Not enough energy' });
  }
  
  // Process tap
  const earned = amount * user.upgrades.tapPower;
  user.balance += earned;
  user.totalTaps += amount;
  user.energy -= amount;
  user.lastActive = Date.now();
  
  // Check for cardinal evolution
  const oldLevel = user.cardinalLevel;
  const requirements = [1000, 10000, 50000, 100000];
  for (let i = 0; i < requirements.length; i++) {
    if (user.totalTaps >= requirements[i] && user.cardinalLevel <= i + 1) {
      user.cardinalLevel = i + 2;
    }
  }
  
  const evolved = oldLevel !== user.cardinalLevel;
  
  res.json({
    success: true,
    balance: user.balance,
    energy: user.energy,
    earned: earned,
    totalTaps: user.totalTaps,
    cardinalLevel: user.cardinalLevel,
    evolved: evolved
  });
});

app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  
  if (!users[userId]) {
    return res.json({ success: false, error: 'User not found' });
  }
  
  // Regenerate energy
  const user = users[userId];
  const timePassed = Date.now() - user.lastActive;
  const regenAmount = Math.floor(timePassed / 1000) * user.upgrades.regenRate;
  user.energy = Math.min(user.energy + regenAmount, user.upgrades.energyMax);
  user.lastActive = Date.now();
  
  res.json({
    success: true,
    user: {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.upgrades.energyMax,
      tapPower: user.upgrades.tapPower,
      totalTaps: user.totalTaps,
      cardinalLevel: user.cardinalLevel,
      achievements: user.achievements || []
    }
  });
});

app.post('/api/upgrade', (req, res) => {
  const { userId, upgrade } = req.body;
  
  if (!users[userId]) {
    return res.json({ success: false, error: 'User not found' });
  }
  
  const user = users[userId];
  const costs = {
    tapPower: 100 * Math.pow(2, user.upgrades.tapPower - 1),
    energyMax: 150 * Math.pow(2, (user.upgrades.energyMax - 100) / 50),
    regenRate: 200 * Math.pow(2, user.upgrades.regenRate - 1)
  };
  
  if (user.balance < costs[upgrade]) {
    return res.json({ success: false, error: 'Not enough coins' });
  }
  
  user.balance -= costs[upgrade];
  
  switch(upgrade) {
    case 'tapPower':
      user.upgrades.tapPower += 1;
      break;
    case 'energyMax':
      user.upgrades.energyMax += 50;
      break;
    case 'regenRate':
      user.upgrades.regenRate += 1;
      break;
  }
  
  res.json({
    success: true,
    balance: user.balance,
    upgrades: user.upgrades
  });
});

// NC Blockchain community endpoint
app.get('/api/community', (req, res) => {
  res.json({
    links: {
      website: 'https://ncblockchain.com',
      twitter: 'https://twitter.com/ncblockchain',
      telegram: 'https://t.me/ncblockchain',
      discord: 'https://discord.gg/ncblockchain'
    },
    stats: {
      totalUsers: Object.keys(users).length,
      totalTaps: Object.values(users).reduce((sum, u) => sum + u.totalTaps, 0),
      totalCardinals: Object.values(users).filter(u => u.cardinalLevel >= 2).length
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web app server running on port ${PORT}`);
});

console.log('NC Blockchain Cardinal Bot is running... 🦅');
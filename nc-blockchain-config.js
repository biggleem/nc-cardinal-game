// NC Blockchain Configuration
module.exports = {
  // Token settings
  token: {
    symbol: 'CARD',
    name: 'Cardinal Token',
    decimals: 18,
    initialSupply: 1000000000, // 1 billion
    
    // Game mechanics
    tapReward: 1,
    referralBonus: 100,
    dailyBonus: 500
  },
  
  // Branding
  branding: {
    name: 'NC Blockchain Cardinal',
    tagline: 'Tap the Cardinal, Earn $CARD!',
    colors: {
      primary: '#DC143C',
      secondary: '#8B0000', 
      accent: '#FFD700',
      background: '#1A1A1A'
    },
    mascot: {
      name: 'Cardinal',
      emoji: '🦅', // Using eagle until custom emoji
      sounds: {
        tap: 'chirp.mp3',
        achievement: 'cardinal-call.mp3'
      }
    }
  },
  
  // Community links
  community: {
    website: 'https://ncblockchain.com',
    twitter: '@ncblockchain',
    telegram: 't.me/ncblockchain',
    discord: 'discord.gg/ncblockchain'
  },
  
  // Game progression
  levels: [
    { name: 'Hatchling', minTaps: 0, multiplier: 1 },
    { name: 'Fledgling', minTaps: 1000, multiplier: 1.2 },
    { name: 'Cardinal', minTaps: 10000, multiplier: 1.5 },
    { name: 'Master Cardinal', minTaps: 100000, multiplier: 2 },
    { name: 'Legendary Cardinal', minTaps: 1000000, multiplier: 3 }
  ],
  
  // Special events
  events: {
    doubleTokenWeekend: {
      multiplier: 2,
      days: [6, 0] // Saturday & Sunday
    },
    ncDay: {
      date: '04-12', // April 12 (NC statehood)
      multiplier: 5
    }
  }
};
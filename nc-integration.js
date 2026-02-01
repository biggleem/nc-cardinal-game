// NC Blockchain Community Integration

const NCBlockchain = {
  // Community Features
  community: {
    website: 'https://ncblockchain.com',
    twitter: 'https://twitter.com/ncblockchain',
    telegram: 'https://t.me/ncblockchain',
    discord: 'https://discord.gg/ncblockchain'
  },

  // Token Integration (Future)
  token: {
    contract: '0x...', // Future $CARD token address
    network: 'polygon', // Or TON
    decimals: 18
  },

  // Cardinal Evolution System
  cardinals: {
    stages: [
      {
        level: 1,
        name: 'Baby Cardinal',
        image: 'cardinal-baby.png',
        requirement: 0
      },
      {
        level: 2,
        name: 'Young Cardinal',
        image: 'cardinal.png',
        requirement: 1000
      },
      {
        level: 3,
        name: 'Adult Cardinal',
        image: 'cardinal-adult.png',
        requirement: 10000
      },
      {
        level: 4,
        name: 'Elder Cardinal',
        image: 'cardinal-elder.png',
        requirement: 50000
      },
      {
        level: 5,
        name: 'Legendary Cardinal',
        image: 'cardinal-legendary.png',
        requirement: 100000,
        special: 'Unlocks NFT minting'
      }
    ]
  },

  // NC-themed achievements
  achievements: [
    {
      id: 'first_flight',
      name: 'First Flight',
      description: 'Tap the cardinal 100 times',
      reward: 100
    },
    {
      id: 'tar_heel',
      name: 'Tar Heel',
      description: 'Reach 10,000 $CARD',
      reward: 1000
    },
    {
      id: 'blockchain_pioneer',
      name: 'Blockchain Pioneer',
      description: 'Invite 10 friends',
      reward: 5000
    },
    {
      id: 'nc_native',
      name: 'NC Native',
      description: 'Play for 7 consecutive days',
      reward: 10000
    }
  ],

  // Special NC events
  events: {
    checkSpecialDay: function() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      
      // NC Statehood Day (November 21)
      if (month === 11 && day === 21) {
        return {
          active: true,
          name: 'NC Statehood Day',
          multiplier: 5,
          message: '🎉 5x $CARD for NC Statehood Day!'
        };
      }
      
      // First Flight Day (December 17)
      if (month === 12 && day === 17) {
        return {
          active: true,
          name: 'First Flight Day',
          multiplier: 3,
          message: '✈️ 3x $CARD for Wright Brothers Day!'
        };
      }
      
      return { active: false };
    }
  },

  // Leaderboard integration
  leaderboard: {
    submitScore: async function(username, score) {
      // Submit to NC Blockchain leaderboard API
      try {
        const response = await fetch('https://api.ncblockchain.com/leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, score, game: 'cardinal-clicker' })
        });
        return await response.json();
      } catch (error) {
        console.error('Leaderboard submission failed:', error);
      }
    }
  }
};

// Export for use in game
window.NCBlockchain = NCBlockchain;
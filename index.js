const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('channel_post', async (msg) => {
  console.log(msg)
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  bot.sendChatAction(chatId, 'typing');
  
  const nickname = msg.author_signature == 'dey' ? 'ayahh' : msg.author_signature == 'jey' ? 'bundaaa sayaangg' : ''

  // Normalisasi pesan (biar gak peka kapital & spasi ekstra)
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  const regexRules = [
    { pattern: /\b(hai+|halo+|hello+)\b/i, response: `alooo ${nickname}..` },
    { pattern: /\b(makasih+|terima\s+kasih|thanks|thx|maaci+|makasi+)\b/i, response: `sama-sama ${nickname} 😇` },
    { pattern: /\b(bye|dadah|sampai\s+jumpa+|babay+)\b/i, response: `dadah ${nickname} 🥺 sampai ketemu lagi yaa` },
    { pattern: /\b(bodoh|goblok|anjing|bangsat|ajg|anj|gblk)\b/i, response: `jangan marah-marah dong ${nickname} 😢` },
    { pattern: /kamu\s+siapa+?/i, response: `aku adalahh jedeyy yang comell 🤖💖` },
    { pattern: /^$/, response: `${nickname} ngetik dulu dong 😅` },
    { pattern: /lagi\s+apa+?/i, response: `lagi mikirin ${nickname} 😚` },
    { pattern: /jam\s+berapa+?/i, dynamic: () => {
        const waktu = new Intl.DateTimeFormat('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Jakarta',
        }).format(new Date());

        return `sekarang jam ${waktu} ${nickname} 🕒`;
      }
    },
    { pattern: /kamu\s+di\s+mana+?/i, response: `aku selalu di hatimu ${nickname} ❤️` },
    // { pattern: /\b(sayang+|cinta+)\b/i, response: `aku juga sayaangg bangettt 😘` },
    { pattern: /\b(ngantuk+)\b/i, response: `boboo ajaa ${nickname}, met boboo ${nickname}, good night, mimpiin aku yaa 😴💤` },
    { pattern: /\blove+\b/i, response: `LOVE YOUU ALL❤️` },
    { pattern: /^j(e)+d(e)+y+$/i, dynamic: () => `kenapaa ${nickname}?` },
    // { pattern: /\bbangunin+\b/i, response: `BANGUNN BUNDAA SAYAANGG` },
    { pattern: /\bmaaf+\b/i, response: `iyaa dimaafin kok wkwkw` },
  ];

  const matchedRule = regexRules.find(rule => rule.pattern.test(normalizedMessage));

  if (matchedRule) {
    const reply = matchedRule.dynamic ? matchedRule.dynamic() : matchedRule.response;
    bot.sendMessage(chatId, reply);
  }
});

bot.on('message', (msg) => {
  console.log('pvt', msg)
  // const chatId = msg.chat.id;
  // bot.sendMessage(chatId, 'tambahin aku ke channel..')
})

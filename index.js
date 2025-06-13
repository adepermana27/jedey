const telegramBot = require("node-telegram-bot-api")

const token = "8038490011:AAESh10Zz2lFRi_alPrIDEaYGaBgcxhGFz8"
const options = {
    polling: true
}

const bot = new telegramBot(token, options)

bot.on("message", (msg) => {
    console.log(msg)
})
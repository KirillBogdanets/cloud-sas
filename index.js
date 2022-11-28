const TelegramApi = require('node-telegram-bot-api')

const token = '5816437809:AAH-Gi7XoPoGegFDW5bEk3QySPyCtNlfulE'

const bot = new TelegramApi(token, { polling: true })

const startBot = async () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        return bot.sendMessage(chatId, text.toUpperCase())
    })
}

startBot()
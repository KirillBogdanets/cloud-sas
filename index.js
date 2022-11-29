const TelegramApi = require('node-telegram-bot-api')
const { FirebaseDB } = require('./src/db');
const firebaseConfig = require('./src/credentials.js');
const db = new FirebaseDB(firebaseConfig);

const token = '5816437809:AAH-Gi7XoPoGegFDW5bEk3QySPyCtNlfulE'

const bot = new TelegramApi(token, { polling: true })

const startBot = async () => {
    const messages = [];
    bot.setMyCommands([
        { command: '/start', description: 'Greetings' },
        { command: '/end', description: 'Saving converation' }
    ]);

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const userName = `${msg.from.first_name} ${msg.from.last_name} | ${msg.from.username}`
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://sticker-collection.com/stickers/plain/LianaWidowPhon_by_fStikBot/512/e4d50d54-96b7-4070-917d-6adc5629c020file_348979.webp')
            return bot.sendMessage(chatId, `Hello my friend`);
        }
        if (text === '/end') {
            await bot.sendSticker(chatId, 'https://sticker-collection.com/stickers/plain/LianaWidowPhon_by_fStikBot/512/5f1aac67-0db8-49ff-9fea-d6b46de5e15dfile_330543.webp')
            if (messages.length === 0) messages.push('No Messages');
            const usersConversation = await db.getUsersConversation(chatId);
            if (usersConversation) {
                await db.updateUsersConversation({
                    converstaionID: `${chatId}`,
                    messages,
                    userName: userName

                })
            } else {
                await db.setUsersConversation({
                    converstaionID: `${chatId}`,
                    messages,
                    userName: userName

                });
            }
            return bot.sendMessage(chatId, `See you`);
        }
        messages.push(`User Message: ${text}`);
        messages.push(`Bot Message: ${text.toUpperCase()}`);
        return bot.sendMessage(chatId, text.toUpperCase())
    })
}

startBot()
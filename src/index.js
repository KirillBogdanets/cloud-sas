// const TelegramApi = require('node-telegram-bot-api')

// const token = '5816437809:AAH-Gi7XoPoGegFDW5bEk3QySPyCtNlfulE'

// const bot = new TelegramApi(token, { polling: true })

// const startBot = async () => {
//     bot.on('message', async msg => {
//         const text = msg.text;
//         const chatId = msg.chat.id;
//         return bot.sendMessage(chatId, text.toUpperCase())
//     })
// }

// startBot()
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 8080;
const { FirebaseDB } = require('./db');
const firebaseConfig = require('./credentials');
const db = new FirebaseDB(firebaseConfig);

app.use(bodyParser.json())

/**
 * return free user
 */
app.get('/coversations', async (req, res) => {
    console.log(1111)
    const messages = await db.getAllConversationsMessages();
    if (messages) {
        res.status(200).json(messages);
    } else {
        res.sendStatus(404);
    }
});

/**
 * return certain user
 */
app.get('/coversation/:id', async (req, res) => {
    const messages = await db.getMessagesByConversationId(req.params.id);
    res.status(200).json(messages);
});

// /**
//  * set new user
//  */
// app.post('/user', async (req, res) => {
//     await db.addUser(req.body);
//     res.sendStatus(201);
// });

// /**
//  * free user
//  */
// app.put('/user/:id', async (req, res) => {
//     const user = await db.freeUser(req.params.id);
//     res.status(200).json(user);
// });

// /**
//  * delete user
//  */
// app.delete('/user/:id', async (req, res) => {
//     const user = await db.deleteUser(req.params.id);
//     res.status(204).json(user);
// });

// /**
//  * delete all users
//  */
// app.delete('/user', async (req, res) => {
//     const user = await db.deleteUsers();
//     res.status(204).json(user);
// });

app.listen(PORT);

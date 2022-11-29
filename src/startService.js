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

app.listen(PORT);

const firebase = require('firebase');

class FirebaseDB {

    constructor(firebaseConfig) {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.database();
        this.conversations = this.db.ref('/conversations');
    }

    async setUsersConversation(conversationData) {
        const coversation = this.conversations.push();
        await coversation.set({
            ...conversationData
        });
    }

    async getUsersConversation(conversationId) {
        return this.db.ref('/conversations/converstaionID/' + conversationId);
    }

    async updateUsersConversation(conversationData) {
        const conversationQuery = this.conversations
            .orderByChild('converstaionID')
            .equalTo(conversationData.converstaionID)
            .limitToFirst(1);
        const conversation = (await conversationQuery.get()).toJSON();
        const conversationId = Object.keys(conversation)[0]
        const conversationRef = this.getCoversationById(conversationId);
        await conversationRef.update({ messages: conversationData.messages });
    }

    getCoversationById(conversationId) {
        return this.db.ref('/conversations/' + conversationId);
    }

    async getAllConversationsMessages() {
        const conversation = (await this.db.ref('/conversations/').get()).toJSON();
        const messages = []
        const arrayOfConversation = Object.keys(conversation);
        arrayOfConversation.forEach((conversationId) => messages.push(conversation[conversationId].messages))
        return messages;
    }

    async getMessagesByConversationId(conversationId) {
        const conversation = (await this.db.ref('/conversations/').get()).toJSON();
        const messages = []
        const arrayOfConversation = Object.keys(conversation);
        arrayOfConversation.forEach((id) => {
            const usersConversation = conversation[id];
            if (conversationId === usersConversation.converstaionID) messages.push(conversation[id].messages)
        })
        return messages;
    }
}

module.exports = { FirebaseDB };

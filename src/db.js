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

    // /**
    //  * Get user by user id
    //  * @param userId
    //  * @returns {firebase.database.Reference}
    //  */
    getCoversationById(conversationId) {
        return this.db.ref('/conversations/' + conversationId);
    }

    async getAllConversationsMessages() {
        const conversation = (await this.db.ref('/conversations/').get()).toJSON();
        const messages = []
        const arrayOfConversation = Object.keys(conversation);
        arrayOfConversation.forEach(conversationId => messages.push(conversation[conversationId].messages))
        return messages;
    }

    async getMessagesByUserName(userName) {
        const conversation = (await this.db.ref('/conversations/').get()).toJSON();
        const messages = []
        const arrayOfConversation = Object.keys(conversation);
        arrayOfConversation.forEach(conversationId => {
            const usersConversation = conversation[conversationId];
            if (userName === usersConversation.userName) messages.push(conversation[conversationId].messages)
        })
        return messages;
    }

    async getMessagesByConversationId(conversationId) {
        const conversation = (await this.db.ref('/conversations/').get()).toJSON();
        const messages = []
        const arrayOfConversation = Object.keys(conversation);
        arrayOfConversation.forEach(id => {
            const usersConversation = conversation[id];
            if (conversationId === usersConversation.converstaionID) messages.push(conversation[id].messages)
        })
        return messages;
    }

    // /**
    //  * Add new free user into storage
    //  * @param userConfig
    //  * @returns {Promise<void>}
    //  */
    // async addUser(userConfig) {
    //     const user = this.users.push();
    //     await user.set({
    //         ...userConfig,
    //         locked: false
    //     });
    // }

    // /**
    //  * Get free user from list
    //  * @returns {Promise<firebase.database.DataSnapshot|null>}
    //  */
    // async getFreeUser() {
    // const userQuery = this.users
    //     .orderByChild('locked')
    //     .equalTo(false)
    //     .limitToFirst(1);
    // const user = (await userQuery.get()).toJSON();
    //     if (user) {
    // const userId = Object.keys(user)[0]
    // const userRef = this.getUserByUserId(userId);
    // await userRef.update({locked: true});
    //         return {
    //             id: userId,
    //             ...user[userId]
    //         }
    //     }
    //     return null
    // }

    // /**
    //  * Get certain user
    //  * @param userId
    //  * @returns {Promise<firebase.database.DataSnapshot>}
    //  */
    // async getUser(userId) {
    //     return this.getUserByUserId(userId).get()
    // }

    // /**
    //  * Update user in storage mark it as free
    //  * @param userId
    //  * @returns {Promise<void>}
    //  */
    // async freeUser(userId) {
    //     const userRef = this.getUserByUserId(userId);
    //     await userRef.update({locked: false});
    // }

    // /**
    //  * Delete user by userId
    //  * @param userId
    //  * @returns {Promise<void>}
    //  */
    // async deleteUser(userId) {
    //     const userRef = this.getUserByUserId(userId);
    //     await userRef.remove();
    // }

    // /**
    //  * Delete all users
    //  * @returns {Promise<void>}
    //  */
    // async deleteUsers() {
    //     await this.users.remove();
    // }

}

module.exports = { FirebaseDB };

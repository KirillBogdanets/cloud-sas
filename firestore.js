// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// const serviceAccount = require('./src/credentials.js');

// initializeApp({
//   credential: cert(serviceAccount)
// });

// const db = getFirestore();

// const docRef = db.collection('conversations').doc('basic-conversation');

// docRef.set({
//     converstaionID: '112233',
//     messages: ['Lovelace'],
//     userName: '1815@asdas'
// });

const firebase = require('firebase');
const serviceAccount = require('./src/credentials.js');

firebase.initializeApp(serviceAccount);
const db = firebase.database();
const conversations = db.ref('/conversations');

const userQuery = conversations.orderByChild('converstaionID')
userQuery.get().then(conv => {
    console.log(conv.toJSON())
})
const coversation = conversations.push();
coversation.set({
    ...{
        converstaionID: '112233',
        messages: ['Lovelace'],
        userName: '1815@asdas'
    }
});

// console.log(111, db)
// console.log(222, users)
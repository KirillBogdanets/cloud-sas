/* eslint-disable no-undef */
const sinon = require('sinon');
const { FirebaseDB } = require('../src/db');
const firebase = require('firebase');
const { expect } = require('chai');

test('getUsersConversation - conversation exists', async () => {
    const toJSONStub = sinon.stub().returns({
        'superid': {
            "converstaionID": "112233",
            "messages": ["Lovelace"],
            "userName": "1815@asdas"
        }
    });

    sinon.stub(firebase, 'initializeApp');
    sinon.stub(firebase, 'database').returns({ ref: toJSONStub });
    const db = new FirebaseDB();

    const conversation = await db.getCoversationById('112233');
    expect(conversation).to.eqls({
        'superid': {
            "converstaionID": "112233",
            "messages": ["Lovelace"],
            "userName": "1815@asdas"
        }
    });
});

test('getUsersConversation - conversation doesnt exist', async () => {
    const toJSONStub = sinon.stub().returns(null);

    sinon.stub(firebase, 'initializeApp');
    sinon.stub(firebase, 'database').returns({ ref: toJSONStub });
    const db = new FirebaseDB();

    const conversation = await db.getCoversationById('wrongID');
    expect(conversation).to.eqls(null);
});

test('setUsersConversation', async () => {
    const setStub = sinon.stub();
    const pushStub = sinon.stub().returns({
        set: setStub
    });
    const refStub = sinon.stub().returns({
        push: pushStub
    });

    sinon.stub(firebase, 'initializeApp');
    sinon.stub(firebase, 'database').returns({ ref: refStub });
    const db = new FirebaseDB();

    await db.setUsersConversation({
        converstaionID: `123123asd`,
        messages: [
            'message_1',
            'message_2'
        ],
        userName: `User Name`
    });
    expect(refStub.calledWith('/conversations')).to.equal(true);
    expect(setStub.calledWith({
        converstaionID: `123123asd`,
        messages: [
            'message_1',
            'message_2'
        ],
        userName: `User Name`
    })).to.equal(true);
});

test('updateUsersConversation', async () => {
    const toJSONStub = sinon.stub().returns({
        'superid': {
            "converstaionID": "112233",
            "messages": ["Lovelace"],
            "userName": "1815@asdas"
        }
    });

    const getStub = sinon.stub().returns({ toJSON: toJSONStub });
    const limitToFirstStub = sinon.stub().withArgs(1).returns({ get: getStub });
    const equalToStub = sinon.stub().withArgs(false).returns({ limitToFirst: limitToFirstStub });
    const orderByChildStub = sinon.stub().withArgs('converstaionID').returns({ equalTo: equalToStub });
    const updateStub = sinon.stub();
    const refStub = sinon.stub().returns({
        orderByChild: orderByChildStub,
        update: updateStub
    });

    sinon.stub(firebase, 'initializeApp');
    sinon.stub(firebase, 'database').returns({ ref: refStub });
    const db = new FirebaseDB();

    await db.updateUsersConversation({
        converstaionID: `123123asd`,
        messages: [
            'message_1',
            'message_2'
        ],
        userName: `User Name`
    });
    expect(refStub.calledWith('/conversations')).to.equal(true);
    expect(updateStub.calledWith({
        messages: [
            'message_1',
            'message_2'
        ]
    })).to.equal(true);
});

afterEach(async () => {
    sinon.restore();
});

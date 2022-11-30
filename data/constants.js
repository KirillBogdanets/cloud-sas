const secureEnv = require('secure-env');

global.env = secureEnv({ secret: 'EJbd1r4ea2zWX!H324-/dd12' });

module.exports = {
    CONSTANTS: {
        AWS_DATA: {
            ACCESS_KEY_ID: global.env.AWS_ACCESS_KEY_ID,
            SECRET_ACCESS_KEY: global.env.AWS_SECRET_ACCESS_KEY
        },
        FIREBASE_DATA: {
            API_KEY: global.env.FIREBASE_API_KEY
        }
    }
};

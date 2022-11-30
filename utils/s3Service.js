const AWS = require('aws-sdk');
const { CONSTANTS } = require('../data/constants');

const { AWS_DATA } = CONSTANTS;
const s3client = new AWS.S3({
    region: 'eu-west-2',
    accessKeyId: AWS_DATA.ACCESS_KEY_ID,
    secretAccessKey: AWS_DATA.SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});

module.exports = { s3client };

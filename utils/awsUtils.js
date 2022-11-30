const { s3client } = require('./s3Service');

class AwsS3utils {
    constructor(bucket) {
        this.bucketParams = { Bucket: bucket };
    }

    /**
     * Uploads a file into s3 bucket.
     * @param fileName - name of a file to upload.
     * @param fileContent - content of a file.
     */
    async uploadFile(fileName, fileContent) {
        await s3client
            .putObject({
                Key: fileName,
                Body: fileContent,
                ...this.bucketParams
            })
            .promise();
    }
}

module.exports = { AwsS3utils }

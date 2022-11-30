const fse = require('fs-extra');
const { AwsS3utils } = require('./awsUtils');

const awsS3utils = new AwsS3utils('cloud-sas');
const REPORT_FOLDER_PATH = './html-report/report.html';
const FORMATTED_DATE = new Date().toISOString();
const ARCHIVE_FILE_NAME = `report-${FORMATTED_DATE}.html`;

// eslint-disable-next-line func-names
(async function () {
    await awsS3utils.uploadFile(ARCHIVE_FILE_NAME, fse.readFileSync(REPORT_FOLDER_PATH));
}());

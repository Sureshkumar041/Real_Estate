const cron = require('node-cron');

const CronFunc = () => {
    cron.schedule(' * * * * *', () => {
        console.log('Running a this function every minute');
    });
}

module.exports = CronFunc;
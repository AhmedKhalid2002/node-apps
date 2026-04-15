import schedule from 'node-schedule';

function cronJob() {
  schedule.scheduleJob('* * * * * *', () => {
    console.log('The answer to life, the universe and everything');
  });
}

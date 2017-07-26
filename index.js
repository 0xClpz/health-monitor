import Monitor from 'ping-monitor';
import {sendAlertMessage, sendUpMessage} from './lib/slack-bot.js';
import {domains} from './config/conf';

const interval = 30/60;

const monitorList = domains.map(domain => new Monitor({website: domain, interval}));

const previousChecks = {};

const alertSent = {};

const isUp = msg => msg.statusCode === 200;

const sentAlert = (alerts, msg) => alertSent[msg.website];
const wasDown = (checks, msg) => checks[msg.website];

const wasDownAndDidntAlert = (checks, alerts, msg) => wasDown(checks, msg) && !sentAlert(alerts, msg);
const wasDownAndDidAlert = (checks, alerts, msg) => wasDown(checks, msg) && sentAlert(alerts, msg); 

const handleDown = (msg) => {
  if(wasDownAndDidntAlert(previousChecks, alertSent, msg)){
    sendAlertMessage(msg.website);
    alertSent[msg.website] = true;
  }
  previousChecks[msg.website] = true;
}

const handleUp = (msg) => {
  if(wasDownAndDidAlert(previousChecks, alertSent, msg)){
    sendUpMessage(msg.website);
    alertSent[msg.website] = false;
  }
  previousChecks[msg.website] = false;
}

const handleMonitorEvents = msg => isUp(msg) ? handleUp(msg) : handleDown(msg);

monitorList.map(monitor => {
  monitor.on('up', handleMonitorEvents);
  monitor.on('down', handleMonitorEvents);
  monitor.on('error', handleMonitorEvents);
});

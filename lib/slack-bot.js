import botkit from 'botkit';
import {slack} from '../config/conf.js';

const controller = botkit.slackbot({debug: true});

const botwh = controller.spawn({
  incoming_webhook: { slack.url }
});

export const sendAlertMessage = domain => {
  botwh.sendWebhook(slack.slackErrorMessage(domain));
};

export const sendUpMessage = domain => {
  botwh.sendWebhook(slack.slackSuccessMessage(domain));
};

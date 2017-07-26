export const slack = {
  webhook: 'INSERT YOUR SLACK WEBHOOK URL HERE',
  // You can configure how your error and success message will look like here
  // Doc can be found here: https://api.slack.com/docs/message-attachments
  slackSuccessMessage: domain => ({
    text: `${domain} IS UP AGAIN!`,
      attachments: [
        {
          title: "We up again, baby!",
          color: '#00FF00',
          text: `${domain} IS UP AGAIN! 🎉`,
        }
      ]
  }),
  slackErrorMessage: domain => ({
    text: `ALERT ALERT ${domain} IS DOWN`,
    attachments: [
      {
        title: "ARGGGG",
        color: '#FF0000',
        text: `${domain} IS DOWN 👻😱`,
      }
    ]
  })
}

// Add your domains here
export const domains = [
  'https://google.com',
  'https://mail.google.com'
];

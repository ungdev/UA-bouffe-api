import axios from 'axios';

export default async () => {
  if (process.env.SLACK_ENABLED === 'true') {
    await axios.request({
      method: 'POST',
      url: process.env.SLACK_WEBHOOK_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        text: '<@U96RD3L93> Chef ! Une nouvelle commande !\n\nP.S.: Fuck <@UCK34T5AQ>',
      },
    });
  }
};

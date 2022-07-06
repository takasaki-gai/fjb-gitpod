'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '5544ea0ca36f2937b003def1828c1239',
    channelAccessToken: '0Of0wfT2MOXPLVfuE4aA0Kd5Z42RILqQeX3CxUJr9eTR5mxIVMUNh7vYsTXkysdQzctXVgsXgBKBIgrvCMEtrvQHCEL1MGwOjvI4qP5QbtWSvBHJPOyB+zLLDfv29zNSrdh/TLOmQgZJG9elmW+O3gdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('ばーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーか')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'こんばんわ' //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);

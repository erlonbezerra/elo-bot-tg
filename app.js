var express = require('express');

var TelegramBot = require('node-telegram-bot-api');

const TG_TOKEN = process.env.TG_TOKEN;

var app = express();
var port = process.env.PORT || 8080;
app.set('port', port);

var bot = new TelegramBot(TG_TOKEN, { polling: true });

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

app.listen(port, () => {
    console.log("server starting on " + app.get('port'));
});

require("cf-deployment-tracker-client").track();
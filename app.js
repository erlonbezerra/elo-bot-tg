var express = require('express');
var cfenv = require('cfenv');

var tbot = require('node-telegram-bot-api');

const TG_TOKEN = '783094697:AAGJ-YuBMI9_Qqkx0mHG86EC-Qx9sdhKUL4';

var app = express();
var appEnv = cfenv.getAppEnv();

var telegramBot = new tbot(TG_TOKEN, { polling: true });

telegramBot.on('message', function (msg) {
    var chatId = msg.chat.id;
    telegramBot.sendMessage(chatId, 'Received your message');
});

telegramBot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    telegramBot.sendMessage(chatId, resp);
});

app.listen(3000, 'localhost', function () {
    console.log("server starting on " + appEnv.url);
});
// Include Telegraf module
const Telegraf = require('telegraf');
const config = require('config');
const log = require('loglevel');
const transactionManager = require('nia-transaction-manager');
const { traduzirAC } = require('./modulos/tradutor');
const ac = require('./modulos/ac/ac-manager');

transactionManager.init({
  redisConfig: {
    config: config.get('redis'),
    dbNum: config.get('redis.database.padrao'),
  },
});

// Create a bot using TOKEN provided as environment variable
const bot = new Telegraf(process.env.TG_TOKEN);
const { DEBUG } = process.env;
const loglevel = process.env.LOG_LEVEL || (DEBUG ? 'DEBUG' : config.get('logLevel'));
log.setDefaultLevel(loglevel);

// Listen on every text message, if message.text is one of the trigger,
// send the reply
bot.on('text', async (ctx) => {
  log.debug(ctx.message.text);
  log.debug(`${JSON.stringify(ctx.message)}`);

  const msg = await traduzirAC(ctx.message, '783094697');

  log.debug(msg);
  const corpusNia = config.get('nia.tipo');

  const respostaAC = await ac.enviarAC(msg, corpusNia);

  log.debug(JSON.stringify(respostaAC));
  return respostaAC.forEach(element => ctx.reply(element.message.text));
  // return ctx.reply(`Olá ${ctx.from.first_name}`);
});

bot.catch((err) => {
  log.error(`${(new Date()).toUTCString()} ERRO => não tratado em:`, err);
});

bot.startPolling();

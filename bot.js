const { Telegraf, Router, Context, Markup } = require('telegraf');
const LocalSession = require('telegraf-session-local');
const { message } = require('telegraf/filters');
const express = require('express');


const bot = new Telegraf('7044967471:AAE2LjXlasCi2DCjFTQ8qej9mZK7vNcKFGs');
const session = new LocalSession('sessions.json');
var context = 0
bot.start((ctx) => {context = ctx.chat.id; console.log(context)})
bot.use(session.middleware())

bot.command("register", (ctx) => {
  return ctx.reply(
    "open webapp",
    Markup.keyboard([
      Markup.button.webApp(
        "Webview",
        "https://tg-bot-web-app-pps.vercel.app/"
      )
    ])
  );
});

let buttons = [['Zxc', '1'], ['foo', '2'], ['bar', '3'], ['baz', '4'], ['baf', '5'], ['raf', '6']]

bot.command('menu', async (ctx) => {
  let keyboardArray = [];
  for (let i = 0; i < buttons.length / 2; i++) {
    keyboardArray.push([Markup.button.callback(buttons[i][0], buttons[i][1]),
      Markup.button.callback(buttons[i + 1][0], buttons[i + 1][1])]);
  }
  const keyboard = Markup.keyboard(keyboardArray);

  return await ctx.reply('You opened menu', keyboard.oneTime().resize());
});

bot.hears('zxc', async (ctx) => {
  console.log('Button 1 pressed');
  // You can add your desired actions here without sending a message back to the bot
});

// bot.on("message", async (ctx) => {
//   console.log(ctx.message.web_app_data)
//   return ctx.reply(ctx.message.web_app_data.data)
// });


bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

const { Telegraf, Markup } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const initBotMenu = require("./bot_menu");

const bot = new Telegraf("7010352501:AAFxZmsJtChCGdm9a83Bxe9lupnEQwlA8DQ");
const session = new LocalSession({database: "sessions.json"});
bot.use(session.middleware());

function button(text, callback) {
  return Markup.button.callback(text, callback);
}




bot.start((ctx) => {initFilters(ctx);
ctx.reply('Привет! Я - VL бот. Моя цель - автоматизировать решение вопросов, связанных с жизнью во Владивостоке.Для начала работы введите Email.');
});

bot.on('text', (ctx) => {
  if(!ctx.session.email){
  const userEmail = ctx.message.text;
  ctx.session.email = userEmail;
  ctx.reply(`Спасибо! Ваш email ${userEmail} успешно сохранен.`);}
  else if(!ctx.session.password){
    const userPassword = ctx.message.text;
    ctx.session.password = userPassword;
    ctx.reply('Спасибо! Ваш пароль успешно сохранен.')}
});



initBotMenu(bot)

bot.command("register", (ctx) => {
  return ctx.reply(
    "open webapp",
    Markup.keyboard([
      Markup.button.webApp("Webview", "https://tg-bot-web-app-pps.vercel.app/movie"),
    ])
  );
});


bot.command("image", (ctx) => {
  return ctx.replyWithPhoto({source: './events/local_events/museum.jpg'}, { caption: "Hello", reply_markup: { inline_keyboard: [[{text: "⬅ Назад", callback_data: "back"}]]} } );
})

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

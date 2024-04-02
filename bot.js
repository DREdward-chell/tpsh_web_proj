const { Telegraf, Markup } = require("telegraf");
const LocalSession = require("telegraf-session-local");
import initBotMenu from "./bot_menu.js";

const bot = new Telegraf("7010352501:AAFxZmsJtChCGdm9a83Bxe9lupnEQwlA8DQ");
const session = new LocalSession({database: "sessions.json"});
bot.use(session.middleware());

function button(text, callback) {
  return Markup.button.callback(text, callback);
}

function filter(filt) {
  if (filt)
    return "✅"
  return "❌"
}

function initFilters(ctx) {
  // cinema filters
  if (!ctx.session.drama)
    ctx.session.drama = false;
  if (!ctx.session.horror)
    ctx.session.horror = false;
  if (!ctx.session.comedy)
    ctx.session.comedy = false;
  if (!ctx.session.thriller)
    ctx.session.thriller = false;
  // events filters
  if (!ctx.session.restaurants)
    ctx.session.restaurants = false;
  if (!ctx.session.party)
    ctx.session.party = false;
  if (!ctx.session.concert)
    ctx.session.concert = false;
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

let cinemaFilters = async (ctx) => {
  let buttons = [
    [button(`${filter(ctx.session.drama)} Drama`, `dramaC`)],
    [button(`${filter(ctx.session.comedy)} Comedy`, `comedyC`)],
    [button(`${filter(ctx.session.horror)} Horror`, `horrorC`)],
    [button(`${filter(ctx.session.thriller)} Thriller`, `thrillerC`)],
    [button("⬅ Назад", "back")]
  ]
  const keyboard = Markup.inlineKeyboard(buttons)
  ctx.editMessageText("🎯 Мои фильтры", keyboard)
}
bot.action("cinemaFilters", cinemaFilters)
bot.action("dramaC", async (ctx) => {ctx.session.drama = !ctx.session.drama; cinemaFilters(ctx)})
bot.action("comedyC", async (ctx) => {ctx.session.comedy = !ctx.session.comedy; cinemaFilters(ctx)})
bot.action("horrorC", async (ctx) => {ctx.session.horror = !ctx.session.horror; cinemaFilters(ctx)})
bot.action("thrillerC", async (ctx) => {ctx.session.thriller = !ctx.session.thriller; cinemaFilters(ctx)})

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

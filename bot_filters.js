const { Markup } = require("telegraf");

function initFilters(bot) {
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
}
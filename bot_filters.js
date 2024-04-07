const {Markup} = require("telegraf");

function filter(filt) {
    if (filt)
        return "✅";
    return "❌";
}

function button(text, callback) {
    return Markup.button.callback(text, callback);
}

function addFilter(ctx) {
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

function addFilterHandler(bot) {
    let cinemaFilters = async (ctx) => {
        let buttons = [
            [button(`${filter(ctx.session.drama)} Драма`, `dramaC`)],
            [button(`${filter(ctx.session.comedy)} Комедия`, `comedyC`)],
            [button(`${filter(ctx.session.horror)} Хоррор`, `horrorC`)],
            [button(`${filter(ctx.session.thriller)} Триллер`, `thrillerC`)],
            [button("⬅ Назад", "back")]
        ]
        const keyboard = Markup.inlineKeyboard(buttons)
        ctx.editMessageText("🎯 Мои фильтры", keyboard)
    }
    bot.action("cinemaFilters", cinemaFilters)
    bot.action("dramaC", async (ctx) => {
        ctx.session.drama = !ctx.session.drama;
        await cinemaFilters(ctx)
    })
    bot.action("comedyC", async (ctx) => {
        ctx.session.comedy = !ctx.session.comedy;
        await cinemaFilters(ctx)
    })
    bot.action("horrorC", async (ctx) => {
        ctx.session.horror = !ctx.session.horror;
        await cinemaFilters(ctx)
    })
    bot.action("thrillerC", async (ctx) => {
        ctx.session.thriller = !ctx.session.thriller;
        await cinemaFilters(ctx)
    })

    let eventFilters = async (ctx) => {
        let buttons = [
            [button(`${filter(ctx.session.restaurants)} Restaurants`, `restC`)],
            [button(`${filter(ctx.session.party)} Parties`, `partyC`)],
            [button(`${filter(ctx.session.concert)} Concerts`, `concertC`)],
            [button("⬅ Назад", "back")]
        ]
        const keyboard = Markup.inlineKeyboard(buttons)
        ctx.editMessageText("🎯 Мои фильтры", keyboard)
    }
    bot.action("eventFilters", eventFilters)
    bot.action("restC", async (ctx) => {
        ctx.session.restaurants = !ctx.session.restaurants;
        await eventFilters(ctx)
    })
    bot.action("partyC", async (ctx) => {
        ctx.session.party = !ctx.session.party;
        await eventFilters(ctx)
    })
    bot.action("concertC", async (ctx) => {
        ctx.session.concert = !ctx.session.concert;
        await eventFilters(ctx)
    })
}

module.exports = {
    initFilters: addFilterHandler,
    addFilter: addFilter
};
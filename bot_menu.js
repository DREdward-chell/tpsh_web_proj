const { Markup } = require("telegraf");

function initBotMenu(bot) {
    let menuButtons = [
        [button("🎭 События", "events"), button("🎞️ Кино", "cinema")],
        [button("☁️ Погода", "weather"), button("🗞️ Новости", "news")],
        [button("🏠 Мой дом", "home"), button("💛 Ограниченные возможности", "6")]
    ];
    
    bot.command("menu", async (ctx) => {
    const keyboard = Markup.inlineKeyboard(menuButtons);
    await ctx.reply("Привет, что сегодня вас интересует?", {reply_markup: { inline_keyboard: menuButtons }, parse_mode: 'HTML'});
    });
    bot.action("back", async (ctx) => {
    const keyboard = Markup.inlineKeyboard(menuButtons);
    await ctx.editMessageText("Привет, что сегодня вас интересует?", keyboard, 'HTML');
    });

    bot.action("events", async (ctx) => {
    let buttons = [
        [button("🎭 Последние события", "popMovies"), button("🎭 Крупные события", "newMovies")],
        [button("🎯 Мои фильтры", "cinemaFilters")],
        [button("⬅ Назад", "back")],
    ];
    const keyboard = Markup.inlineKeyboard(buttons);
    ctx.editMessageText("🎭 Что вас интересует?", keyboard);
    })

    bot.action("cinema", async (ctx) => {
    let buttons = [
        [button("🎞️ Популярные фильмы", "popMovies"), button("🎞️ Новые фильмы", "newMovies")],
        [button("🎯 Мои фильтры", "cinemaFilters")],
        [button("⬅ Назад", "back")],
    ];
    const keyboard = Markup.inlineKeyboard(buttons);
    ctx.editMessageText("🎞️ Что вас интересует?", keyboard);
    })

    bot.action("weather", async (ctx) => {
    let buttons = [
        [button("⬅ Назад", "back")]
    ];
    const keyboard = Markup.inlineKeyboard(buttons);
    ctx.editMessageText("☁️ Сегодня {погода}", keyboard);
    })

    bot.action("news", async (ctx) => {
    let buttons = [
        [button("🗞️ Новости Владивостока", "vladNews"), button("🗞️ Новости Страны", "rusNews")],
        [button("🗞️ Новости Мира", "allNews")],
        [button("⬅ Назад", "back")]
    ]
    const keyboard = Markup.inlineKeyboard(buttons);
    ctx.editMessageText("🗞️ Какие новости сегодня?", keyboard)
    })

    bot.action("home", async (ctx) => {
    let buttons = [
        [button("🏠 Проблемы", "problem"), button("🏠 Заплатить за коммуналку", "payHome")],
        [button("⬅ Назад", "back")]
    ]
    const keyboard = Markup.inlineKeyboard(buttons);
    ctx.editMessageText("🏠 Что не так с домом?", keyboard)
    })
}
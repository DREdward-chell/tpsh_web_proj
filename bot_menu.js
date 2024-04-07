const {Markup} = require("telegraf");

function button(text, callback) {
    return Markup.button.callback(text, callback);
}
function webButton(text, url) {
    return Markup.button.webApp(text, url)
}

function initBotMenu(bot) {
    let menuButtons = [
        [button("🎭 События", "events"), button("🎞️ Кино", "cinema")],
        [webButton("☁️ Погода", "https://tg-bot-web-app-pps.vercel.app/weather"), webButton("🗞️ Новости", "https://tg-bot-web-app-pps.vercel.app/news")],
        [button("🏠 Мой дом", "home"), button("💛 Ограниченные возможности", "developing")]
    ];

    bot.command("menu", async (ctx) => {
        const keyboard = Markup.inlineKeyboard(menuButtons);
        await ctx.reply("Привет, что сегодня вас интересует?", {
            reply_markup: {inline_keyboard: menuButtons},
            parse_mode: 'HTML'
        });
    });
    bot.action("back", async (ctx) => {
        const keyboard = Markup.inlineKeyboard(menuButtons);
        await ctx.editMessageText("Привет, что сегодня вас интересует?", keyboard, 'HTML');
    });

    bot.action("events", async (ctx) => {
        let buttons = [
            [webButton("🎭 Последние события", "https://tg-bot-web-app-pps.vercel.app/events")],
            [button("🎯 Мои фильтры", "eventFilters")],
            [button("⬅ Назад", "back")],
        ];
        const keyboard = Markup.inlineKeyboard(buttons);
        ctx.editMessageText("🎭 Что вас интересует?", keyboard);
    })

    bot.action("cinema", async (ctx) => {
        let buttons = [
            [webButton("🎞️ Сеансы", "https://tg-bot-web-app-pps.vercel.app/movie")],
            [button("🎯 Мои фильтры", "cinemaFilters")],
            [button("⬅ Назад", "back")],
        ];
        const keyboard = Markup.inlineKeyboard(buttons);
        ctx.editMessageText("🎞️ Что вас интересует?", keyboard);
    })

    bot.action("news", async (ctx) => {
        let buttons = [
            [button("🗞️ Новости Владивостока", "vladNews"), button("🗞️ Новости Страны", "rusNews")],
            [button("🗞️ Новости Мира", "allNews")],
            [button("⬅ Назад", "back")]
        ]
        const keyboard = Markup.inlineKeyboard(buttons);
        ctx.editMessageText("🗞️ Новости", keyboard)
    })

    bot.action("home", async (ctx) => {
        let buttons = [
            [button("🏠 Проблемы", "developing"), button("🏠 Коммунальные услуги", "developing")],
            [button("⬅ Назад", "back")]
        ]
        const keyboard = Markup.inlineKeyboard(buttons);
        ctx.editMessageText("🏠 Мой дом", keyboard)
    })

    bot.action("developing", async (ctx) => {
        ctx.reply("Функция находится в разработке")
    })
}

module.exports = initBotMenu
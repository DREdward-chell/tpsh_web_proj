const { Markup } = require("telegraf");

function getData(eventType, eventName) {
    const event = require(`./events/${eventType}/${eventName}.json`);
    return event;
}
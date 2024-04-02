const { Markup } = require("telegraf");

function getData(eventType, eventName) {
    const event = require(`./events/${eventType}/${eventName}.json`);
    return [event.text, `./events/${eventType}/` + event.image];
}


function showEvent(ctx, event_type, event_name) {
  const event = getData(event_type, event_name);
  const text = event[0];
  const image = event[1];
}

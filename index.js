const token = "6353528834:AAF_sOdMlJQXHw-8v_b7l62MLBJ8w29yBDU";

const api = require("node-telegram-bot-api");

const bot = new api(token, {polling: true});

bot.setMyCommands([
    {command: "/start", description: "Перезапустити бота"},
    {command: "/missyou", description: "Сумую(("},
    {command: "/loveyou", description: "Кохаю тебе❤️"}
])

bot.on("message", async (msg) => {
    const text = msg.text;
    const id = msg.chat.id;

    switch (text) {
        
        case "/start":
            await bot.sendMessage(id, "О, Зайка, це ти 😍😍😍")
            // bot.sendSticker(id, "https://telegram.org.ru/uploads/posts/2017-03/1490201527_4.png");
            break

        case "/missyou":
            await bot.sendMessage(id, "Я теж, любов моя((")
            break

        case "/loveyou":
            await bot.sendMessage(id, "Я тебе більше😍❤️🥰")
            break

        default: 
            await bot.sendMessage(id, "Поки ще не розумію тебе((")
            break
    }

})

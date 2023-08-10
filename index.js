const {gameOptions, restartOptions} = require("./options")

require('dotenv').config();

const {TOKEN} = process.env; 

const api = require("node-telegram-bot-api");

const bot = new api(TOKEN, {polling: true});

bot.setMyCommands([
    {command: "/start", description: "Перезапустити бота"},
    {command: "/missyou", description: "Сумую(("},
    {command: "/loveyou", description: "Кохаю тебе❤️"},
    {command: "/game", description: "Зіграти в гру🎮"}
])

const chats = {};

const startGame = async (id) => {
    const number = Math.floor(Math.random() * 10)
    chats.chatId = number;
    await bot.sendMessage(id, `Гра почалась)`, gameOptions)
} 


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

        case "/game":
            await bot.sendMessage(id, "Зараз я загадаю цифру від 0 до 9, а ти спробуй відгадати)")
            startGame(id);
            break

        default: 
            await bot.sendMessage(id, "Поки ще не розумію тебе((")
            break
    }

})

bot.on("callback_query", async msg => {
    const data = msg.data;
    const id = msg.message.chat.id;
    if (Number(data) === chats.chatId) { 
        return await bot.sendMessage(id, `Твій вибір кнопка ${data} і це вірно, перемога🥳🥳🥳`, restartOptions)
    }
    if ( data === "/restart") {
        return startGame(id);
    }

    return await bot.sendMessage(id, `Твій вибір кнопка ${data} і нажаль це неправильний вибір`, restartOptions)
})

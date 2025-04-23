require("dotenv").config();
const cron = require("node-cron");
const TelegramBot = require("node-telegram-bot-api");
const { getCircleReportForTG } = require("../controllers/circlesController");

// Replace with your bot's token from @BotFather
const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID;

// Create a bot using Long Polling
const bot = new TelegramBot(token, { polling: true });

async function getTodaysBirthDayReport(chatId) {
  const bdcToday = await getCircleReportForTG();

  if (Array.isArray(bdcToday) && bdcToday.length > 0) {
    let msgTemplate = "Don't Forget To Say Happy Birthday 🎂 🎉🍾🎉🎉 TO: \n";

    bdcToday.forEach((bd) => {
      if (bd.isYou) {
        bot.sendMessage(chatId, `Happy Birthday 🎂 🎉🍾🎉🎉 ${bd.firstName}.`);
        msgTemplate = false;
        return;
      }

      msgTemplate += `${bd.firstName} ${bd.lastName} \n`;
    });

    if (msgTemplate) {
      bot.sendMessage(chatId, msgTemplate);
    }

    return;
  }

  bot.sendMessage(chatId, bdcToday);
}

bot.onText(/^myid$/i, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Your chatID is: ${chatId}`);
});

bot.onText(/^bdc$/i, async (msg) => {
  const chatId = msg.chat.id;

  await getTodaysBirthDayReport(chatId);
});

cron.schedule("0 0 0 * * *", async () => {
  console.log("Automatic TG Report!");
  await getTodaysBirthDayReport(chatId);
});

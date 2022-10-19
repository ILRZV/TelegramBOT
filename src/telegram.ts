import { Telegraf, Telegram } from "telegraf";
import "dotenv/config";

const botToken = process.env.BOT_TOKEN;

if (botToken === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const tBot = new Telegraf(botToken);
tBot.telegram.setMyCommands([{ command: "start", description: "test" }]);
tBot.telegram.setMyCommands([{ command: "admin", description: "test" }]);

export const bot = tBot;

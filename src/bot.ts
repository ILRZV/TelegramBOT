import mongoose from "mongoose";
import { bot } from "./telegram";
import { mainMenuScene } from "./controllers/user/menu/mainMenuScene";
import { subscribeScene } from "./controllers/user/addSubscriptions/subcribeScene";
import RedisSession from "telegraf-session-redis";
import { mySubcscriptionsScene } from "./controllers/user/mySubscriptions/deleteScene";
import { mainInfo } from "./common/information";
import { adminMenuScene } from "./controllers/admin/adminMenu/adminMenuScene";
import { adminMenuSceneName, mainMenuSceneName } from "./common/sceneNames";
import { Scenes } from "telegraf";
import { addDescriptionScene } from "./controllers/admin/addDescription/addDescriptionScene";
import { addCategoriesScene } from "./controllers/admin/addCategories/addCategoriesScene";
import { inputScene } from "./common/scenes/inputScene";
import { addPositionScene } from "./controllers/admin/addPosition/addPositionScene";

const stage = new Scenes.Stage([
  subscribeScene as any,
  mainMenuScene as any,
  mySubcscriptionsScene as any,
  adminMenuScene as any,
  addDescriptionScene as any,
  addCategoriesScene as any,
  inputScene as any,
  addPositionScene as any,
]);

mongoose.connect("mongodb://localhost:27017/botDB");
mongoose.connection.on("error", (err) => {
  process.exit(1);
});
const session = new RedisSession({
  store: {
    host: process.env.TELEGRAM_SESSION_HOST || "127.0.0.1",
    port: process.env.TELEGRAM_SESSION_PORT || 6379,
  },
});

mongoose.connection.on("open", () => {
  bot.use(session);
  // const category = new Category({
  //   name: "Vacancy categories",
  //   categories: ["Node", "React", "Java", "DevOps"],
  // });
  // category.save((err) => {
  //   if (err) return console.log(err);
  //   console.log("Сохранен объект", category);

  // });

  bot.use(stage.middleware());
  bot.command("start", (ctx: any) => {
    ctx.scene.enter(mainMenuSceneName);
  });
  bot.command("admin", (ctx: any) => {
 
    ctx.scene.enter(adminMenuSceneName);
  });
  bot.hears("Information", (ctx) => ctx.reply(mainInfo));
  // bot.command("save", (ctx) => {
  //   const user = new User(ctx.from);
  //   user.save(function (err) {
  //     if (err) return console.log(err);
  //     console.log("Сохранен объект", user);
  //   });
  // });

  // bot.start((ctx) => ctx.reply("Welcome"));
  // bot.help((ctx) => ctx.reply("Send me a sticker"));
  // bot.on("sticker", (ctx) => ctx.reply("👍"));
  // bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  // bot.on("text", (ctx) => {
  //   console.log(ctx.message);
  //   ctx.telegram.sendMessage(
  //     ctx.message.chat.id,
  //     `Hello ${ctx.from.first_name}`
  //   );
  // });
  bot.launch();

  // adminBot.on("sticker", (ctx) => ctx.reply("PiuPiu"));
  // adminBot.launch();
  process.once("SIGINT", () => bot.stop());
  process.once("SIGTERM", () => bot.stop());
});

import { UserData } from "../../../dataAccess/User";
import { getSubcribeKeyboard } from "./subscribeMenuKeyboard";
import { arrayToString } from "../../../utils/stringUtils";
import {
  subscribeSceneName,
  mainMenuSceneName,
} from "../../../common/sceneNames";
import { Scenes } from "telegraf";
import { addControllPanel } from "../../../common/controllPanel";

export const subscribeScene = addControllPanel(
  new Scenes.BaseScene(subscribeSceneName)
);

subscribeScene.enter(async (ctx: any) => {
  await ctx.reply(
    `Which vacancies do you interested in? Current categories:\n${arrayToString(
      ctx.session.allCategories,
      " "
    )}`,
    getSubcribeKeyboard(ctx)
  );
});

subscribeScene.hears("Finish", async (ctx: any) => {
  await UserData.updateCategoriesForUser(
    ctx.session.userId,
    ctx.session.myCategories
  );
  ctx.session.currentCategories = [];
  ctx.reply(`Categories were saved successfully`);
  ctx.scene.enter(mainMenuSceneName);
});

subscribeScene.on("text", async (ctx: any) => {
  try {
    const input = ctx.message.text.toLowerCase().split(" ");
    input.forEach((category: string, index: number) => {
      if (!ctx.session.allCategories.includes(category)) {
        ctx.reply(
          `Category ${input[index]} does not exists`,
          getSubcribeKeyboard(ctx)
        );
        throw new Error("Wrong input");
      }
      if (ctx.session.myCategories.includes(category)) {
        ctx.reply(
          `Category ${input[index]} already in you subscriptions, to delete it, please go to main menu`,
          getSubcribeKeyboard(ctx)
        );
        throw new Error("Wrong input");
      }
    });
    ctx.session.myCategories = [...ctx.session.myCategories, ...input];
    ctx.reply(`Categories were added`, getSubcribeKeyboard(ctx));
  } catch (err) {
    console.log(err.message);
  }
});

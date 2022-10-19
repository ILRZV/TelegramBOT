import {
  addCategoriesSceneName,
  addDescriptionSceneName,
  adminMenuSceneName,
  mainMenuSceneName,
} from "../../../common/sceneNames";
import {
  getAddCategoriesKeyboard,
  keyboardReturnToDescription,
  keyboardAddCategories,
} from "./addCategoriesKeyboard";
import { Scenes } from "telegraf";
import { addControllPanel } from "../../../common/controllPanel";
import { arrayToString } from "../../../utils/stringUtils";

export const addCategoriesScene = addControllPanel(
  new Scenes.BaseScene(addCategoriesSceneName)
);

addCategoriesScene.enter(async (ctx: any) => {
  await ctx.reply(
    `Current categories:\n${arrayToString(ctx.session.allCategories, " ")}`,
    getAddCategoriesKeyboard(ctx)
  );
});

addCategoriesScene.hears(keyboardReturnToDescription, async (ctx: any) => {
  ctx.scene.enter(addDescriptionSceneName);
});

addCategoriesScene.hears(keyboardAddCategories, async (ctx: any) => {
  console.log(ctx.session.positionCategories);
  // ctx.scene.enter(adminMenuSceneName);
});

addCategoriesScene.on("text", async (ctx: any) => {
  try {
    const input = ctx.message.text.toLowerCase().split(" ");
    console.log(ctx.session);
    input.forEach((category: string, index: number) => {
      if (!ctx.session.allCategories?.includes(category)) {
        ctx.reply(
          `Category ${input[index]} does not exists`,
          getAddCategoriesKeyboard(ctx)
        );
        throw new Error("Wrong input");
      }
      if (ctx.session.positionCategories?.includes(category)) {
        ctx.reply(
          `Category ${input[index]} already in you subscriptions, to delete it, please go to main menu`,
          getAddCategoriesKeyboard(ctx)
        );
        throw new Error("Wrong input");
      }
    });
    ctx.session.positionCategories = [
      ...(ctx.session.positionCategories ? ctx.session.positionCategories : []),
      ...input,
    ];
    ctx.reply(
      `Categories were added\nCurrent categories:\n${ctx.session.positionCategories}`,
      getAddCategoriesKeyboard(ctx)
    );
  } catch (err) {
    console.log(err.message);
  }
});

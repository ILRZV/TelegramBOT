import {
  addCategoriesSceneName,
  addDescriptionSceneName,
  adminMenuSceneName,
  mainMenuSceneName,
} from "../../../common/sceneNames";
import {
  getAddDescriptionKeyboard,
  keyboardAddDescription,
  keyboardReturnToAdminMenu,
} from "./addDescriptionKeyboard";
import { Scenes } from "telegraf";
import { addControllPanel } from "../../../common/controllPanel";
import { CategoryData } from "../../../dataAccess/Category";
import { arrayToLowerCase } from "../../../utils/stringUtils";

export const addDescriptionScene = addControllPanel(
  new Scenes.BaseScene(addDescriptionSceneName)
);

addDescriptionScene.enter(async (ctx: any) => {
  await ctx.reply(
    `Please, add description to your position`,
    getAddDescriptionKeyboard(ctx)
  );
});

addDescriptionScene.hears(keyboardReturnToAdminMenu, async (ctx: any) => {
  ctx.session.positionDescription = null;
  ctx.scene.enter(adminMenuSceneName);
});

addDescriptionScene.hears(keyboardAddDescription, async (ctx: any) => {
  if (ctx.session.positionDescription) {
    const currentCutegories = await CategoryData.findCategories(
      "Vacancy categories"
    );
    ctx.session.allCategories = arrayToLowerCase(currentCutegories.categories);
    ctx.scene.enter(addCategoriesSceneName);
  } else {
    await ctx.reply(
      `You don't provide any description`,
      getAddDescriptionKeyboard(ctx)
    );
  }
});

addDescriptionScene.on("text", async (ctx: any) => {
  try {
    const input = ctx.message.text;
    ctx.session.positionDescription = input;
    await ctx.reply(
      `Your description: \n${input}`,
      getAddDescriptionKeyboard(ctx)
    );
  } catch (err) {
    console.log(err.message);
  }
});

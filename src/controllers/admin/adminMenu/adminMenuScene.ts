import { Markup, Scenes } from "telegraf";
import {
  adminMenuSceneName,
  inputSceneName,
  addPositionSceneName,
} from "../../../common/sceneNames";
import { getAdminMenuKeyboard, keyboardAddPosition } from "./adminMenuKeyboard";
import { addControllPanel } from "../../../common/controllPanel";
import { CategoryData } from "../../../dataAccess/Category";

export const adminMenuScene = addControllPanel(
  new Scenes.BaseScene(adminMenuSceneName)
);

adminMenuScene.enter(async (ctx: any) => {
  // ctx.session.positionDescription = null;
  // ctx.session.positionCategories = null;
  // console.log(ctx.session.input);
  await ctx.reply(`Hello admin`, getAdminMenuKeyboard(ctx));
});

adminMenuScene.hears(keyboardAddPosition, async (ctx: any) => {
  if (!ctx.session.position) ctx.session.position = { categories: [] };
  ctx.session.database = {};
  const { categories } = await CategoryData.findCategories(
    "Vacancy categories"
  );
  ctx.session.database.categories = categories;
  ctx.scene.enter(addPositionSceneName);
});

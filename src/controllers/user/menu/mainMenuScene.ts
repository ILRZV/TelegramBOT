import { Scenes } from "telegraf";
import {
  getMainMenuKeyboard,
  keyboardDelete,
  keyboardAdd,
  keyboardAdmin,
} from "./mainMenuKeyboard";
import { UserData } from "../../../dataAccess/User";
import { IUser } from "../../../models/UserShema";
import { CategoryData } from "../../../dataAccess/Category";
import { arrayToLowerCase, arrayToString } from "../../../utils/stringUtils";
import {
  adminMenuSceneName,
  mySubscriptionsSceneName,
  subscribeSceneName,
} from "../../../common/sceneNames";
import { addControllPanel } from "../../../common/controllPanel";

export const mainMenuScene = addControllPanel(new Scenes.BaseScene("mainMenu"));

mainMenuScene.enter(async (ctx: any) => {
  let user: IUser = await UserData.findUser(ctx.from.id);
  console.log("first");
  if (!user) {
    user = UserData.saveNewUser({
      id: ctx.from.id,
      username: ctx.from.username,
      categories: [],
    });
    ctx.reply(
      "Hello, I am a head requiter bot, I provide ability to subscribe to only this positions, that you are interested in.\n\n" +
        "To understand how I work, tap info button\n\n" +
        "Now you don't subscribed to any positions. To add categories, please use add button\n",
      getMainMenuKeyboard(ctx)
    );
  } else {
    if (user.categories.length === 0) {
      ctx.reply(
        "Now you don't subscribed to any positions. To add categories, please use add button\n",
        getMainMenuKeyboard(ctx)
      );
    } else {
      console.log(user.categories);
      await ctx.reply(
        `You subscribed to: ${arrayToString(user.categories, " ")}`,
        getMainMenuKeyboard(ctx)
      );
    }
  }
});

mainMenuScene.hears(keyboardAdd, async (ctx: any) => {
  const currentCutegories = await CategoryData.findCategories(
    "Vacancy categories"
  );
  const user = await UserData.findUser(ctx.from.id);
  ctx.session = null;
  ctx.session.allCategories = arrayToLowerCase(currentCutegories.categories);
  ctx.session.userId = user.id;
  ctx.session.myCategories = arrayToLowerCase(user.categories);
  ctx.scene.enter(subscribeSceneName);
});

mainMenuScene.hears(keyboardDelete, async (ctx: any) => {
  const user = await UserData.findUser(ctx.from.id);
  ctx.session = null;
  ctx.session.userId = user.id;
  ctx.session.myCategories = arrayToLowerCase(user.categories);
  ctx.scene.enter(mySubscriptionsSceneName);
});

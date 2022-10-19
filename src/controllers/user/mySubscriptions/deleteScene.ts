import { UserData } from "../../../dataAccess/User";
import { getMySubscriptionsKeyboard } from "./deleteKeyboard";
import { arrayToString } from "../../../utils/stringUtils";
import { mainMenuSceneName } from "../../../common/sceneNames";
import { Scenes } from "telegraf";
import { addControllPanel } from "../../../common/controllPanel";

export const mySubcscriptionsScene = addControllPanel(
  new Scenes.BaseScene("mySubscriptions")
);

mySubcscriptionsScene.enter(async (ctx: any) => {
  if (ctx.session.myCategories.length > 0) {
    await ctx.reply(
      `Your current categories: \n${arrayToString(
        ctx.session.myCategories,
        " "
      )}\nTo delete, please enter title`,
      getMySubscriptionsKeyboard(ctx)
    );
  } else {
    await ctx.reply("You don't have any subscriptions");
  }
});

mySubcscriptionsScene.hears("Finish", async (ctx: any) => {
  await UserData.updateCategoriesForUser(
    ctx.session.userId,
    ctx.session.myCategories
  );
  ctx.session.myCategories = [];
  ctx.reply(`Categories were deleted successfully`);
  ctx.scene.enter(mainMenuSceneName);
});

mySubcscriptionsScene.hears("Current", async (ctx: any) => {
  await ctx.reply(
    `Your current categories: \n${ctx.session.myCategories}\nTo delete, please enter title`,
    getMySubscriptionsKeyboard(ctx)
  );
});

mySubcscriptionsScene.on("text", async (ctx: any) => {
  try {
    const inputCategories = ctx.message.text.toLowerCase().split(" ");

    inputCategories.forEach((category: string) =>
      handleDeleteCategory(category, ctx)
    );

    ctx.reply(`Category was deleted`, getMySubscriptionsKeyboard(ctx));
  } catch (err) {
    console.log(err.message);
  }
});

function handleDeleteCategory(category: string, ctx: any) {
  const position = ctx.session.myCategories.indexOf(category);
  const isCategoryInArray: boolean = position === -1 ? false : true;

  if (!isCategoryInArray) {
    ctx.reply(
      `Category ${category} does not exists in you subscriptions`,
      getMySubscriptionsKeyboard(ctx)
    );

    throw new Error("Wrong input");
  } else {
    ctx.session.myCategories.splice(position, 1);
  }
}

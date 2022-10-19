import { addPositionSceneName } from "../../../common/sceneNames";
import { Scenes } from "telegraf";
import { addControllPanel } from "../../../common/controllPanel";
import { AddPositionMarkup } from "./addPosition.markup";
import { inputSceneController } from "../../../common/scenes/inputSceneController";
import { CategoryData } from "../../../dataAccess/Category";
import {
  arrayToString,
  stringToArrayOfWords,
} from "../../../utils/stringUtils";

export const addPositionScene = addControllPanel(
  new Scenes.BaseScene(addPositionSceneName)
);

const categoriesExtractor = async (
  listOfCategories: string,
  ctx: any
): Promise<string[]> => {
  if (listOfCategories) {
    const inputCategories = stringToArrayOfWords(listOfCategories);

    let categories: string[] = ctx.session.database.categories;

    categories = categories.map((category) => category.toLowerCase());
    let correctCategories: string[] = [];
    let incorectCategories: string[] = [];
    let alreadyAddedCategories: string[] = [];
    inputCategories.forEach((category) => {
      if (ctx.session.position.categories.includes(category)) {
        alreadyAddedCategories.push(category);
      } else {
        if (categories.includes(category)) {
          correctCategories.push(category);
        } else {
          incorectCategories.push(category);
        }
      }
    });
    if (incorectCategories.length > 0)
      await ctx.reply(
        `Unclear categories:\n ${arrayToString(incorectCategories, " ")}\n`
      );
    if (alreadyAddedCategories.length > 0)
      await ctx.reply(
        `Already added categories:\n ${arrayToString(
          alreadyAddedCategories,
          " "
        )}\n`
      );

    return correctCategories;
  }
};

addPositionScene.enter(async (ctx: any) => {
  if (ctx.session.input?.positionDescription) {
    ctx.session.position.description = ctx.session.input.positionDescription;
    ctx.session.input.positionDescription = null;
  }

  if (ctx.session.input?.listOfCategories) {
    const correctCategories = await categoriesExtractor(
      ctx.session.input.listOfCategories,
      ctx
    );

    ctx.session.position.categories = [
      ...ctx.session.position.categories,
      ...correctCategories,
    ];
    ctx.session.input.listOfCategories = null;
  }

  const currentDescription = ctx.session.position?.description
    ? `Description:\n${ctx.session.position.description}`
    : "";
  const currentCategories =
    ctx.session.position?.categories &&
    ctx.session.position.categories?.length > 0
      ? `Categories:\n${arrayToString(ctx.session.position.categories, " ")}`
      : "";
  ctx.reply(
    `Position\n${currentDescription}\n${currentCategories}`,
    AddPositionMarkup
  );
});

addPositionScene.action("add_description", (ctx: any) => {
  try {
    inputSceneController(ctx, addPositionSceneName, "positionDescription");
    ctx.reply("Please, enter a description");
  } catch (err) {
    console.log(err.message);
  }
});

addPositionScene.action("add_categories", async (ctx: any) => {
  try {
    inputSceneController(ctx, addPositionSceneName, "listOfCategories");
    ctx.reply(
      `Please, enter list of categories\n\nAvailable categories: ${arrayToString(
        ctx.session.database.categories,
        " "
      )}`
    );
  } catch (err) {
    console.log(err.message);
  }
});

addPositionScene.action("clear", async (ctx: any) => {
  try {
    ctx.session.position = { categories: [] };
    ctx.scene.enter(addPositionSceneName);
  } catch (err) {
    console.log(err.message);
  }
});

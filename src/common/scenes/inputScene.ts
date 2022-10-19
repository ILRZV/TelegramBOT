import { Scenes } from "telegraf";
import { addControllPanel } from "../controllPanel";
import { inputSceneName } from "../sceneNames";
import { Context } from "../../interfaces/interfaces";

export const inputScene = addControllPanel(
  new Scenes.BaseScene(inputSceneName)
);

inputScene.enter(async (ctx: any) => {});

inputScene.on("text", async (ctx: Context) => {
  try {
    ctx.session.input[ctx.session.inputSceneData.sessionFieldName] =
      ctx.message.text;
    ctx.scene.enter(ctx.session.inputSceneData.nextInputSceneName);
  } catch (err) {
    console.log(err.message);
  }
});

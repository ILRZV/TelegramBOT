import { inputSceneName } from "../sceneNames";

export const inputSceneController = (
  ctx: any,
  nextInputSceneName: string,
  sessionFieldName: string
) => {
  ctx.session.inputSceneData = {
    nextInputSceneName,
    sessionFieldName,
  };
  ctx.session.input = ctx.session.input ? ctx.session.input : {};
  ctx.scene.enter(inputSceneName);
};

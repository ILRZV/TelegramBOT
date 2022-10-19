import { adminMenuSceneName, mainMenuSceneName } from "./sceneNames";

export const addControllPanel = (scene: any) => {
  scene.command("start", async (ctx: any) => {
    ctx.session = null;
    ctx.scene.enter(mainMenuSceneName);
  });

  scene.command("admin", (ctx: any) => {
    ctx.session = null;
    ctx.scene.enter(adminMenuSceneName);
  });

  return scene;
};

import { Markup } from "telegraf";

export const keyboardAddPosition = "Add position";

export const getAdminMenuKeyboard = (ctx: any) => {
  let subscribeKeyboard: any = Markup.keyboard([[keyboardAddPosition]]);
  subscribeKeyboard = subscribeKeyboard.resize();
  return subscribeKeyboard;
};

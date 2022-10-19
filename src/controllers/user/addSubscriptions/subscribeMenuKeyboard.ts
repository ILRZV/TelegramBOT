import { Markup } from "telegraf";

export const keyboardFinish = "Finish";

export const getSubcribeKeyboard = (ctx: any) => {
  let subscribeKeyboard: any = Markup.keyboard([[keyboardFinish] as any]);
  subscribeKeyboard = subscribeKeyboard.resize();
  return subscribeKeyboard;
};

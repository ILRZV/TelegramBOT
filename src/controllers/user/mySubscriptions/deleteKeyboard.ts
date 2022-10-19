import { Markup } from "telegraf";

export const keyboardMySubscriptions = "Current";
export const keyboardSubcribe = "Finish";

export const getMySubscriptionsKeyboard = (ctx: any) => {
  let subscribeKeyboard: any = Markup.keyboard([
    [keyboardSubcribe, keyboardMySubscriptions] as any,
  ]);
  subscribeKeyboard = subscribeKeyboard.resize();
  return subscribeKeyboard;
};

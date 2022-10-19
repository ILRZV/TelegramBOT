import { Markup } from "telegraf";

export const keyboardReturnToAdminMenu = "Back to admin menu";
export const keyboardAddDescription = "Add description";

export const getAddDescriptionKeyboard = (ctx: any) => {
  let subscribeKeyboard: any = Markup.keyboard([
    [keyboardReturnToAdminMenu, keyboardAddDescription],
  ]);
  subscribeKeyboard = subscribeKeyboard.resize();
  return subscribeKeyboard;
};

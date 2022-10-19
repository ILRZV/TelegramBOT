import { Markup } from "telegraf";

export const keyboardReturnToDescription = "Back to descriptions";
export const keyboardAddCategories = "Add categories";

export const getAddCategoriesKeyboard = (ctx: any) => {
  let subscribeKeyboard: any = Markup.keyboard([
    [keyboardReturnToDescription, keyboardAddCategories],
  ]);
  subscribeKeyboard = subscribeKeyboard.resize();
  return subscribeKeyboard;
};

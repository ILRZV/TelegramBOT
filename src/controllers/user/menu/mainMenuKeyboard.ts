import { Markup } from "telegraf";

export const keyboardAdd = "Add more categories";
export const keyboardDelete = "Delete categories";
export const keyboardInfo = "Information";
export const keyboardVacancies = "Vacancies";
export const keyboardAdmin = "Admin panel";

export const getMainMenuKeyboard = (ctx: any) => {
  let subscribeKeyboard: any = Markup.keyboard([
    [keyboardAdd, keyboardDelete],
    [keyboardInfo, keyboardVacancies],
    [keyboardAdmin],
  ]);
  subscribeKeyboard = subscribeKeyboard.resize();
  return subscribeKeyboard;
};

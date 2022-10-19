export const AddPositionMarkup = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Add description", callback_data: "add_description" },
        { text: "Add categories", callback_data: "add_categories" },
      ],
      [{ text: "Publish", callback_data: "publish" }],
      [{ text: "Clear", callback_data: "clear" }],
    ],
  },
};

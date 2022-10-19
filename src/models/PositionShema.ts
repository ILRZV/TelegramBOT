import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IPosition {
  description: string;
  categories: string[];
}

export const positionScheme = new Schema({
  description: { type: String, required: true },
  categories: { type: [String], required: true },
});

export const Position = mongoose.model("Positions", positionScheme);

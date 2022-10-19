import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ICategory {
  name: string;
  categories: string[];
}

export const categoryScheme = new Schema({
  name: { type: String, required: true },
  categories: { type: [String], required: true },
});

export const Category = mongoose.model("Categories", categoryScheme);

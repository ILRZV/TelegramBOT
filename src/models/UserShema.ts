import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser {
  id: number;
  username: string;
  categories: string[];
}

export const userScheme = new Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  categories: { type: [String], required: true },
});

export const User = mongoose.model("User", userScheme);

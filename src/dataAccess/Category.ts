import { HydratedDocument } from "mongoose";
import { ICategory, Category } from "../models/CategoryShema";

class CategoryAccess {
  // public saveNewUser(userData: ICategory) {
  //   const category = new Category(userData);
  //   category.save((err) => {
  //     if (err) return console.log(err);
  //     console.log("Сохранен объект", category);
  //   });

  // }

  public async findCategories(
    name: String
  ): Promise<HydratedDocument<ICategory>> {
    return await Category.findOne({ name });
  }
}

export const CategoryData = new CategoryAccess();

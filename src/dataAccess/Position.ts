import { HydratedDocument } from "mongoose";
import { IPosition, Position } from "../models/PositionShema";

class PositionAccess {
  public addPosition(data: IPosition) {
    const position = new Position(data);
    position.save((err) => {
      if (err) return console.log(err);
      console.log("Сохранен объект", position);
    });
  }
  // public async findCategories(
  //   name: String
  // ): Promise<HydratedDocument<ICategory>> {
  //   return await Category.findOne({ name });
  // }
}

export const PositionData = new PositionAccess();

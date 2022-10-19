import { HydratedDocument } from "mongoose";
import { User, IUser } from "../models/UserShema";

class UserAccess {
  public saveNewUser(userData: IUser): HydratedDocument<IUser> {
    const user = new User(userData);
    user.save((err, res) => {
      if (err) return console.log(err);
      console.log("Сохранен объект", user);
    });
    return user;
  }

  public updateCategoriesForUser(userId: number, newCategories: string[]) {
    return User.updateOne(
      { id: userId },
      { $set: { categories: newCategories } }
    );
  }

  public async findUser(id: number): Promise<HydratedDocument<IUser>> {
    return await User.findOne({ id });
  }
}

export const UserData = new UserAccess();

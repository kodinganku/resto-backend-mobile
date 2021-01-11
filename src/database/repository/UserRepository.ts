import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { GenericError } from "../../lib/utils";
const bcrypt = require("bcrypt");
const saltRounds = 10;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(username: string, email: string, password: string, address?: string) {
    const existUser = await this.createQueryBuilder("user")
      .where("user.username = :username", { username })
      .orWhere("user.email = :email", { email })
      .getOne();
    if (existUser) {
      return false;
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.address = address;
    return this.save(user);
  }

  async validatePassword(email: string, password: string) {
    const user = await this.findOne({
      select: ["password"],
      where: { email: email },
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return await this.findOne({ where: { email: email } });
      } else {
        throw new GenericError(404, "Password not match");
      }
    }
    throw new GenericError(404, "User not found");
  }
}

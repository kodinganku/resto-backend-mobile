import { User } from "../entity/User";
import Faker from "faker";
import { define } from "typeorm-seeding";

define(User, (faker: typeof Faker) => {
  const firstName = faker.name.firstName();

  const user = new User();
  user.email = faker.internet.email();
  user.username = firstName + faker.random.number(2);
  user.password = faker.random.word();
  return user;
});

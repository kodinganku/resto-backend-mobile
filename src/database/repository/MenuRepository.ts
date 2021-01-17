import { EntityRepository, Repository } from "typeorm";
import { Menu } from "../entity/";
import { GenericError } from "../../lib/utils";

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {}

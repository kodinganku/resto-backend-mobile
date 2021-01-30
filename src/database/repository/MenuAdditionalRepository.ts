import { EntityRepository, Repository } from "typeorm";
import { MenuAdditional } from "../entity";
import { GenericError } from "../../lib/utils";

@EntityRepository(MenuAdditional)
export class MenuAdditionalRepository extends Repository<MenuAdditional> {}

import { EntityRepository, Repository } from "typeorm";
import { Discount } from "../entity";
import { GenericError } from "../../lib/utils";

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {}

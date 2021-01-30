import { EntityRepository, Repository } from "typeorm";
import { Discount } from "../entity";
import { GenericError } from "../../lib/utils";

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {
  async decreaseQuantity(discount: Discount, decreaseNumber: number = 1) {
    if (discount.dsc_unit == 0) {
      throw new GenericError(400, "Discount no quota");
    }
    discount.dsc_unit = discount.dsc_unit - decreaseNumber;
    return await this.save(discount);
  }
}

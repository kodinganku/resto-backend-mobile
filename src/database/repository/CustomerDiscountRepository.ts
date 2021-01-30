import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { CustomerDiscount, Discount, Customer } from "../entity";
import { DiscountRepository } from ".";
import { GenericError } from "../../lib/utils";

@EntityRepository(CustomerDiscount)
export class CustomerDiscountRepository extends Repository<CustomerDiscount> {
  async checkClaim(discount: Discount, customer: Customer): Promise<{ obj: CustomerDiscount; status: boolean }> {
    const discount_customer = await this.findOne({
      where: { cds_discount: discount.dsc_id, cds_customer: customer.cst_id },
    });
    return {
      obj: discount_customer,
      status: typeof discount_customer !== "undefined" && discount_customer.cds_claimed !== null,
    };
  }

  async claimDiscount(code: string, customer: Customer) {
    //find discount with code
    const discountRepos = await getCustomRepository(DiscountRepository);
    const discount_detail = await discountRepos.findOne({ where: { dsc_code: code } });
    if (discount_detail == null) {
      throw new GenericError(404, "Invalid Discount Code");
    }
    //check usage of customer for this discount
    const disc_customer = await this.checkClaim(discount_detail, customer);
    console.log(disc_customer);
    if (disc_customer.status) {
      throw new GenericError(400, "Discount Has Been Claim");
    } else {
      if (typeof disc_customer.obj == "undefined") {
        //if no claim before create first
        let customerClaimObj = new CustomerDiscount();
        customerClaimObj.cds_claimed = new Date();
        customerClaimObj.cds_discount = discount_detail;
        customerClaimObj.cds_customer = customer;
        await discountRepos.decreaseQuantity(discount_detail).then(async () => {
          await this.save(customerClaimObj).then();
        });
      } else {
        disc_customer.obj.cds_claimed = new Date();
        console.log("haha");
        await discountRepos.decreaseQuantity(discount_detail).then(async () => {
          await this.save(disc_customer.obj).then();
        });
      }
      return { message: "Success claim discount" };
    }
  }
}

import { EntityRepository, Repository } from "typeorm";
import { Customer } from "../entity/Customer";
import { GenericError } from "../../lib/utils";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async createAndSave(name: string, email: string, fcm_token: string) {
    const customer = new Customer();
    customer.cst_name = name;
    customer.cst_email = email;
    customer.cst_fcm_token = fcm_token;
    await this.save(customer);
    return await this.findOne({ where: { cst_email: email } });
  }

  async updateProfile(data: any, customer: Customer) {
    const updatedCustomer = this.merge(customer, data);
    await this.save(updatedCustomer);
    return await this.findOne({ where: { cst_email: customer.cst_email } });
  }
}

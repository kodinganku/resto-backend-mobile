import { EntityRepository, Repository } from "typeorm";
import { Customer } from "../entity/Customer";
import { GenericError } from "../../lib/utils";


@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
    async createAndSave(name: string, email: string){
        const customer = new Customer();
        customer.cst_name = name;
        customer.cst_email = email
        await this.save(customer);
        return await this.findOne({where: {cst_email: email}});
    }
}

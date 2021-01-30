import { createParamDecorator } from "routing-controllers";
import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../database/repository/";
import { verifyAuthToken } from "../lib/auth";

export function UserFromSession(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: async action => {
      const token = action.request.headers["authorization"];
      try {
        const credential_data = verifyAuthToken(token);
        const custRepo = getCustomRepository(CustomerRepository);
        const customer = await custRepo.findOne({ where: { cst_id: credential_data.cst_id } });
        return customer;
      } catch (err) {
        return null;
      }
    },
  });
}

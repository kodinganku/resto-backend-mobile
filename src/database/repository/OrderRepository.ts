import { EntityRepository, Repository } from "typeorm";
import { Order } from "../entity/order";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}

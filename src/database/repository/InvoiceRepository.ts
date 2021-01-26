import { EntityRepository, Repository } from "typeorm";
import { Invoice } from "../entity/order";

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {}

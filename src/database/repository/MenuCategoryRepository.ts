import { EntityRepository, Repository } from "typeorm";
import { MenuCategory } from "../entity/";
import { GenericError } from "../../lib/utils";

@EntityRepository(MenuCategory)
export class MenuCategoryRepository extends Repository<MenuCategory> {
  async createAndSave(name: string) {
    const menu_categ = new MenuCategory();
    menu_categ.mnc_name = name;
    await this.save(menu_categ);
    return await this.findOne({ where: { menu_categ: name } });
  }

  async updateCategory(data: any, id_menucateg: number) {
    const menu_categ = await this.findOne({ where: { mnc_id: id_menucateg } });
    const updatedMenuCateg = this.merge(menu_categ, data);
    await this.save(updatedMenuCateg);
    return await this.findOne({ where: { mnc_id: id_menucateg } });
  }
}

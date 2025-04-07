import { Category } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { ICategoryRepository } from "./interface/ICategoryRepository";

export class CategoryRepository
  extends RepositoryBase<Category>
  implements ICategoryRepository {

  async findByName(name: string): Promise<Category | null> {
    return await this.model.findOne({ where: { name } });
  }

  async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
    const [affectedRows] = await this.model.update(categoryData, { where: { id } });
    return affectedRows > 0 ? await this.findById(id) : null;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await this.findById(id);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  }
}

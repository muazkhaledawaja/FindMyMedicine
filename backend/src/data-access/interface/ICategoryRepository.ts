import { Category } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface ICategoryRepository extends IRepository<Category> {
  findByName(name: string): Promise<Category | null>;
  updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null>;
  deleteCategory(id: number): Promise<boolean>;
}

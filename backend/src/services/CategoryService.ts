import { Category } from "../models";
import { categoryRepository } from "../data-access";
import { NotFoundError, BadRequestError } from "../errors";

export default class CategoryService {
  async createCategory(data: Partial<Category>): Promise<Category> {
    const existing = await categoryRepository.findByName(data.name || "");
    if (existing) throw new BadRequestError("Category already exists");
    return await categoryRepository.create(data);
  }

  async getAllCategories(): Promise<Category[]> {
    return await categoryRepository.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await categoryRepository.findById(id);
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category | null> {
    const category = await categoryRepository.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    return await categoryRepository.update(id, data);
  }

  async deleteCategory(id: number): Promise<boolean> {
    return await categoryRepository.delete(id);
  }
}

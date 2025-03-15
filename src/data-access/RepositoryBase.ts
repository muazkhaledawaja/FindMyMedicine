import { Model, ModelCtor } from "sequelize-typescript";
import { WhereOptions } from "sequelize"; // Import WhereOptions from sequelize
import { IRepository } from "./interface/IRepositoryBase";

export class RepositoryBase<T extends Model> implements IRepository<T> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findById(id: number): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.findAll();
  }

  async create(entity: Partial<T>): Promise<T> {
    return await this.model.create(entity as any, { returning: true });
  }

  async update(id: number, entity: Partial<T>): Promise<T | null> {
    const whereCondition: WhereOptions = { id }; // Use WhereOptions from sequelize
    const [affectedRows] = await this.model.update(entity as any, {
      where: whereCondition,
    });
    return affectedRows > 0 ? await this.findById(id) : null;
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.findById(id);
    if (entity) {
      await entity.destroy();
      return true;
    }
    return false;
  }
}

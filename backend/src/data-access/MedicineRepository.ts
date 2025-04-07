import { Medicine } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IMedicineRepository } from "./interface/IMedicineRepository";

export class MedicineRepository
  extends RepositoryBase<Medicine>
  implements IMedicineRepository {
  
  async findByName(name: string): Promise<Medicine | null> {
    return await this.model.findOne({ where: { name } });
  }

  async updateMedicine(id: number, data: Partial<Medicine>): Promise<Medicine | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    return affectedRows > 0 ? await this.findById(id) : null;
  }

  async deleteMedicine(id: number): Promise<boolean> {
    const medicine = await this.findById(id);
    if (medicine) {
      await medicine.destroy();
      return true;
    }
    return false;
  }
}

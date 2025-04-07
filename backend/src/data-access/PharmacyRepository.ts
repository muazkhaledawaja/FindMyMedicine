import { Pharmacy } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IPharmacyRepository } from "./interface/IPharmacyRepository";

export class PharmacyRepository
  extends RepositoryBase<Pharmacy>
  implements IPharmacyRepository {

  async findByName(name: string): Promise<Pharmacy | null> {
    return await this.model.findOne({ where: { name } });
  }

  async updatePharmacy(id: number, pharmacyData: Partial<Pharmacy>): Promise<Pharmacy | null> {
    const [affectedRows] = await this.model.update(pharmacyData, { where: { id } });
    return affectedRows > 0 ? await this.findById(id) : null;
  }

  async deletePharmacy(id: number): Promise<boolean> {
    const pharmacy = await this.findById(id);
    if (pharmacy) {
      await pharmacy.destroy();
      return true;
    }
    return false;
  }
}

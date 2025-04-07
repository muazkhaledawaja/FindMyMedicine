import { PharmacyMedicine } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IPharmacyMedicineRepository } from "./interface/IPharmacyMedicineRepository";

export class PharmacyMedicineRepository
  extends RepositoryBase<PharmacyMedicine>
  implements IPharmacyMedicineRepository {
  
  async findByPharmacyId(pharmacyId: number): Promise<PharmacyMedicine[]> {
    return await this.model.findAll({ where: { pharmacy_id: pharmacyId } });
  }

  async findByMedicineId(medicineId: number): Promise<PharmacyMedicine[]> {
    return await this.model.findAll({ where: { medicine_id: medicineId } });
  }

  async updateStock(pharmacyId: number, medicineId: number, stock_quantity: number): Promise<boolean> {
    const [updated] = await this.model.update(
      { stock_quantity },
      {
        where: {
          pharmacy_id: pharmacyId,
          medicine_id: medicineId,
        },
      }
    );
    return updated > 0;
  }
}

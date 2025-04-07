import { PharmacyMedicine } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IPharmacyMedicineRepository extends IRepository<PharmacyMedicine> {
  findByPharmacyId(pharmacyId: number): Promise<PharmacyMedicine[]>;
  findByMedicineId(medicineId: number): Promise<PharmacyMedicine[]>;
  updateStock(pharmacyId: number, medicineId: number, stock_quantity: number): Promise<boolean>;
}

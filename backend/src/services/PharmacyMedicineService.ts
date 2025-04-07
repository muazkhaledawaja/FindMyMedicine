import { PharmacyMedicine } from "../models";
import { pharmacyMedicineRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class PharmacyMedicineService {
  async create(data: Partial<PharmacyMedicine>): Promise<PharmacyMedicine> {
    return await pharmacyMedicineRepository.create(data);
  }

  async getAll(): Promise<PharmacyMedicine[]> {
    return await pharmacyMedicineRepository.findAll();
  }

  async getByPharmacyId(pharmacyId: number): Promise<PharmacyMedicine[]> {
    return await pharmacyMedicineRepository.findByPharmacyId(pharmacyId);
  }

  async getByMedicineId(medicineId: number): Promise<PharmacyMedicine[]> {
    return await pharmacyMedicineRepository.findByMedicineId(medicineId);
  }

  async updateStock(pharmacyId: number, medicineId: number, stock_quantity: number): Promise<boolean> {
    return await pharmacyMedicineRepository.updateStock(pharmacyId, medicineId, stock_quantity);
  }

  async delete(pharmacyId: number, medicineId: number): Promise<boolean> {
    const entity = await PharmacyMedicine.findOne({
      where: { pharmacy_id: pharmacyId, medicine_id: medicineId },
    });
    if (!entity) throw new NotFoundError("Pharmacy-medicine entry not found.");
    await entity.destroy();
    return true;
  }
}

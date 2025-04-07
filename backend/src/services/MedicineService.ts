import { Medicine } from "../models";
import { medicineRepository } from "../data-access";
import { NotFoundError, BadRequestError } from "../errors";

export default class MedicineService {
  async createMedicine(data: Partial<Medicine>): Promise<Medicine> {
    const existing = await medicineRepository.findByName(data.name || "");
    if (existing) throw new BadRequestError("Medicine already exists");
    return await medicineRepository.create(data);
  }

  async getAllMedicines(): Promise<Medicine[]> {
    return await medicineRepository.findAll();
  }

  async getMedicineById(id: number): Promise<Medicine | null> {
    return await medicineRepository.findById(id);
  }

  async updateMedicine(id: number, data: Partial<Medicine>): Promise<Medicine | null> {
    const medicine = await medicineRepository.findById(id);
    if (!medicine) throw new NotFoundError("Medicine not found");
    return await medicineRepository.update(id, data);
  }

  async deleteMedicine(id: number): Promise<boolean> {
    return await medicineRepository.delete(id);
  }
}

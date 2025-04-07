import { Pharmacy } from "../models";
import { pharmacyRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class PharmacyService {
  async createPharmacy(data: Partial<Pharmacy>): Promise<Pharmacy> {
    return await pharmacyRepository.create(data);
  }

  async getAllPharmacies(): Promise<Pharmacy[]> {
    return await pharmacyRepository.findAll();
  }

  async getPharmacyById(id: number): Promise<Pharmacy | null> {
    return await pharmacyRepository.findById(id);
  }

  async updatePharmacy(id: number, data: Partial<Pharmacy>): Promise<Pharmacy | null> {
    const pharmacy = await pharmacyRepository.findById(id);
    if (!pharmacy) throw new NotFoundError("Pharmacy not found");
    return await pharmacyRepository.update(id, data);
  }

  async deletePharmacy(id: number): Promise<boolean> {
    return await pharmacyRepository.delete(id);
  }
}

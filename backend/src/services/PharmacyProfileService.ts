import { PharmacyProfile } from "../models";
import { pharmacyProfileRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class PharmacyProfileService {
  async create(data: Partial<PharmacyProfile>): Promise<PharmacyProfile> {
    return await pharmacyProfileRepository.create(data);
  }

  async getAll(): Promise<PharmacyProfile[]> {
    return await pharmacyProfileRepository.findAll();
  }

  async getById(id: number): Promise<PharmacyProfile | null> {
    return await pharmacyProfileRepository.findById(id);
  }

  async getByUserId(userId: number): Promise<PharmacyProfile | null> {
    return await pharmacyProfileRepository.findByUserId(userId);
  }

  async update(id: number, data: Partial<PharmacyProfile>): Promise<PharmacyProfile | null> {
    const existing = await pharmacyProfileRepository.findById(id);
    if (!existing) throw new NotFoundError("Pharmacy profile not found");
    return await pharmacyProfileRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await pharmacyProfileRepository.delete(id);
  }
}

import { Prescription } from "../models";
import { prescriptionRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class PrescriptionService {
  async createPrescription(data: Partial<Prescription>): Promise<Prescription> {
    return await prescriptionRepository.create(data);
  }

  async getAllPrescriptions(): Promise<Prescription[]> {
    return await prescriptionRepository.findAll();
  }

  async getPrescriptionById(id: number): Promise<Prescription | null> {
    return await prescriptionRepository.findById(id);
  }

  async getPrescriptionsByUser(userId: number): Promise<Prescription[]> {
    return await prescriptionRepository.findByUserId(userId);
  }

  async getPrescriptionsByDoctor(doctorId: number): Promise<Prescription[]> {
    return await prescriptionRepository.findByDoctorId(doctorId);
  }

  async updatePrescription(id: number, data: Partial<Prescription>): Promise<Prescription | null> {
    const prescription = await prescriptionRepository.findById(id);
    if (!prescription) throw new NotFoundError("Prescription not found");
    return await prescriptionRepository.update(id, data);
  }

  async deletePrescription(id: number): Promise<boolean> {
    return await prescriptionRepository.delete(id);
  }
}

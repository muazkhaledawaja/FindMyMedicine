import { Prescription } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IPrescriptionRepository } from "./interface/IPrescriptionRepository";

export class PrescriptionRepository
  extends RepositoryBase<Prescription>
  implements IPrescriptionRepository {
  
  async findByUserId(userId: number): Promise<Prescription[]> {
    return await this.model.findAll({ where: { user_id: userId } });
  }

  async findByDoctorId(doctorId: number): Promise<Prescription[]> {
    return await this.model.findAll({ where: { doctor_id: doctorId } });
  }
}

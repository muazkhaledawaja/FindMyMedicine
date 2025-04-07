import { Prescription } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IPrescriptionRepository extends IRepository<Prescription> {
  findByUserId(userId: number): Promise<Prescription[]>;
  findByDoctorId(doctorId: number): Promise<Prescription[]>;
}

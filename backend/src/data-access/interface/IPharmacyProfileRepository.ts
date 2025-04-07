import { PharmacyProfile } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IPharmacyProfileRepository extends IRepository<PharmacyProfile> {
  findByUserId(userId: number): Promise<PharmacyProfile | null>;
}

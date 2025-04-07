import { PharmacyProfile } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IPharmacyProfileRepository } from "./interface/IPharmacyProfileRepository";

export class PharmacyProfileRepository
  extends RepositoryBase<PharmacyProfile>
  implements IPharmacyProfileRepository {
  
  async findByUserId(userId: number): Promise<PharmacyProfile | null> {
    return await this.model.findOne({ where: { user_id: userId } });
  }
}

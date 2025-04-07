import { DeliveryProfile } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IDeliveryProfileRepository } from "./interface/IDeliveryProfileRepository";

export class DeliveryProfileRepository
  extends RepositoryBase<DeliveryProfile>
  implements IDeliveryProfileRepository {
  
  async findByUserId(userId: number): Promise<DeliveryProfile | null> {
    return await this.model.findOne({ where: { user_id: userId } });
  }
}

import { DeliveryProfile } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IDeliveryProfileRepository extends IRepository<DeliveryProfile> {
  findByUserId(userId: number): Promise<DeliveryProfile | null>;
}

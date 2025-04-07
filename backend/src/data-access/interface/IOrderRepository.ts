import { Order } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IOrderRepository extends IRepository<Order> {
  findByUserId(userId: number): Promise<Order[]>;
  findByPharmacyId(pharmacyId: number): Promise<Order[]>;
  updateOrder(id: number, data: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: number): Promise<boolean>;
}

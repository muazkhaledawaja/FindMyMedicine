import { OrderItem } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IOrderItemRepository extends IRepository<OrderItem> {
  findByOrderId(orderId: number): Promise<OrderItem[]>;
  deleteByOrderId(orderId: number): Promise<number>;
}

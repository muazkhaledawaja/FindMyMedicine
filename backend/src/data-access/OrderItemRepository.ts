import { OrderItem } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IOrderItemRepository } from "./interface/IOrderItemRepository";

export class OrderItemRepository
  extends RepositoryBase<OrderItem>
  implements IOrderItemRepository {
  
  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    return await this.model.findAll({ where: { order_id: orderId } });
  }

  async deleteByOrderId(orderId: number): Promise<number> {
    return await this.model.destroy({ where: { order_id: orderId } });
  }
}

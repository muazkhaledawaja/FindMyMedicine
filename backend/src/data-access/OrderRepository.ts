import { Order } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IOrderRepository } from "./interface/IOrderRepository";

export class OrderRepository
  extends RepositoryBase<Order>
  implements IOrderRepository {

  async findByUserId(userId: number): Promise<Order[]> {
    return await this.model.findAll({ where: { user_id: userId } });
  }

  async findByPharmacyId(pharmacyId: number): Promise<Order[]> {
    return await this.model.findAll({ where: { pharmacy_id: pharmacyId } });
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    return affectedRows > 0 ? await this.findById(id) : null;
  }

  async deleteOrder(id: number): Promise<boolean> {
    const order = await this.findById(id);
    if (order) {
      await order.destroy();
      return true;
    }
    return false;
  }
}

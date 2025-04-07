import { Order } from "../models";
import { orderRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class OrderService {
  async createOrder(data: Partial<Order>): Promise<Order> {
    return await orderRepository.create(data);
  }

  async getOrders(): Promise<Order[]> {
    return await orderRepository.findAll();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return await orderRepository.findById(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await orderRepository.findByUserId(userId);
  }

  async getOrdersByPharmacy(pharmacyId: number): Promise<Order[]> {
    return await orderRepository.findByPharmacyId(pharmacyId);
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    const order = await orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found");
    return await orderRepository.update(id, data);
  }

  async deleteOrder(id: number): Promise<boolean> {
    return await orderRepository.delete(id);
  }
}

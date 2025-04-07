import { OrderItem } from "../models";
import { orderItemRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class OrderItemService {
  async createItem(data: Partial<OrderItem>): Promise<OrderItem> {
    return await orderItemRepository.create(data);
  }

  async getAllItems(): Promise<OrderItem[]> {
    return await orderItemRepository.findAll();
  }

  async getItemById(id: number): Promise<OrderItem | null> {
    return await orderItemRepository.findById(id);
  }

  async getItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return await orderItemRepository.findByOrderId(orderId);
  }

  async updateItem(id: number, data: Partial<OrderItem>): Promise<OrderItem | null> {
    const item = await orderItemRepository.findById(id);
    if (!item) throw new NotFoundError("Order item not found");
    return await orderItemRepository.update(id, data);
  }

  async deleteItem(id: number): Promise<boolean> {
    return await orderItemRepository.delete(id);
  }

  async deleteItemsByOrder(orderId: number): Promise<number> {
    return await orderItemRepository.deleteByOrderId(orderId);
  }
}

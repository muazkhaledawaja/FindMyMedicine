import { DeliveryProfile } from "../models";
import { deliveryProfileRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class DeliveryProfileService {
  async create(data: Partial<DeliveryProfile>): Promise<DeliveryProfile> {
    return await deliveryProfileRepository.create(data);
  }

  async getAll(): Promise<DeliveryProfile[]> {
    return await deliveryProfileRepository.findAll();
  }

  async getById(id: number): Promise<DeliveryProfile | null> {
    return await deliveryProfileRepository.findById(id);
  }

  async getByUserId(userId: number): Promise<DeliveryProfile | null> {
    return await deliveryProfileRepository.findByUserId(userId);
  }

  async update(id: number, data: Partial<DeliveryProfile>): Promise<DeliveryProfile | null> {
    const existing = await deliveryProfileRepository.findById(id);
    if (!existing) throw new NotFoundError("Delivery profile not found");
    return await deliveryProfileRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await deliveryProfileRepository.delete(id);
  }
}

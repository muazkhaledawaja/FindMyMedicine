import { ActivityLog } from "../models";
import { activityLogRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class ActivityLogService {
  async create(data: Partial<ActivityLog>): Promise<ActivityLog> {
    return await activityLogRepository.create(data);
  }

  async getAll(): Promise<ActivityLog[]> {
    return await activityLogRepository.findAll();
  }

  async getById(id: number): Promise<ActivityLog | null> {
    return await activityLogRepository.findById(id);
  }

  async getByUserId(userId: number): Promise<ActivityLog[]> {
    return await activityLogRepository.findByUserId(userId);
  }

  async update(id: number, data: Partial<ActivityLog>): Promise<ActivityLog | null> {
    const existing = await activityLogRepository.findById(id);
    if (!existing) throw new NotFoundError("Activity log not found");
    return await activityLogRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await activityLogRepository.delete(id);
  }
}

import { ActivityLog } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IActivityLogRepository } from "./interface/IActivityLogRepository";

export class ActivityLogRepository
  extends RepositoryBase<ActivityLog>
  implements IActivityLogRepository {
  
  async findByUserId(userId: number): Promise<ActivityLog[]> {
    return await this.model.findAll({ where: { user_id: userId } });
  }
}

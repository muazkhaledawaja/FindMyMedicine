import { ActivityLog } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IActivityLogRepository extends IRepository<ActivityLog> {
  findByUserId(userId: number): Promise<ActivityLog[]>;
}

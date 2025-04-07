import { UserReview } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IUserReviewRepository extends IRepository<UserReview> {
  findByReviewerId(reviewerId: number): Promise<UserReview[]>;
  findByReviewedUserId(reviewedUserId: number): Promise<UserReview[]>;
}

import { UserReview } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IUserReviewRepository } from "./interface/IUserReviewRepository";

export class UserReviewRepository
  extends RepositoryBase<UserReview>
  implements IUserReviewRepository {
  
  async findByReviewerId(reviewerId: number): Promise<UserReview[]> {
    return await this.model.findAll({ where: { reviewer_id: reviewerId } });
  }

  async findByReviewedUserId(reviewedUserId: number): Promise<UserReview[]> {
    return await this.model.findAll({ where: { reviewed_user_id: reviewedUserId } });
  }
}

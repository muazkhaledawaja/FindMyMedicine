import { UserReview } from "../models";
import { userReviewRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class UserReviewService {
  async create(data: Partial<UserReview>): Promise<UserReview> {
    return await userReviewRepository.create(data);
  }

  async getAll(): Promise<UserReview[]> {
    return await userReviewRepository.findAll();
  }

  async getById(id: number): Promise<UserReview | null> {
    return await userReviewRepository.findById(id);
  }

  async getByReviewerId(reviewerId: number): Promise<UserReview[]> {
    return await userReviewRepository.findByReviewerId(reviewerId);
  }

  async getByReviewedUserId(reviewedUserId: number): Promise<UserReview[]> {
    return await userReviewRepository.findByReviewedUserId(reviewedUserId);
  }

  async update(id: number, data: Partial<UserReview>): Promise<UserReview | null> {
    const existing = await userReviewRepository.findById(id);
    if (!existing) throw new NotFoundError("User review not found");
    return await userReviewRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await userReviewRepository.delete(id);
  }
}

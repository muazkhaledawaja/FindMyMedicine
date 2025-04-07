import { Request, Response } from "express";
import {UserReviewService} from "../services";
import { handleControllerError } from "../errors";
import { HttpStatus } from "../enums/ResponseCodes";

export default class UserReviewController {
  private service = new UserReviewService();

  async create(req: Request, res: Response) {
    try {
      const review = await this.service.create(req.body);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: review,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const reviews = await this.service.getAll();
      res.status(HttpStatus.OK).json(reviews);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const review = await this.service.getById(id);
      if (!review) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Review not found" });
      }
      res.status(HttpStatus.OK).json(review);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByReviewer(req: Request, res: Response) {
    try {
      const reviewerId = parseInt(req.params.reviewerId);
      const result = await this.service.getByReviewerId(reviewerId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByReviewedUser(req: Request, res: Response) {
    try {
      const reviewedUserId = parseInt(req.params.reviewedUserId);
      const result = await this.service.getByReviewedUserId(reviewedUserId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.service.update(id, req.body);
      res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.delete(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

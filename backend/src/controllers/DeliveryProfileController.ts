import { Request, Response } from "express";
import DeliveryProfileService from "../services/DeliveryProfileService";
import { handleControllerError } from "../errors";
import { HttpStatus } from "../enums/ResponseCodes";

export default class DeliveryProfileController {
  private service = new DeliveryProfileService();

  async create(req: Request, res: Response) {
    try {
      const profile = await this.service.create(req.body);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Delivery profile created",
        data: profile,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const list = await this.service.getAll();
      res.status(HttpStatus.OK).json(list);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const profile = await this.service.getById(id);
      if (!profile) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: "Delivery profile not found",
        });
      }
      res.status(HttpStatus.OK).json(profile);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await this.service.getByUserId(userId);
      if (!profile) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: "Delivery profile not found",
        });
      }
      res.status(HttpStatus.OK).json(profile);
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

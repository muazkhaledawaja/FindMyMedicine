import { Request, Response } from "express";
import {ActivityLogService} from "../services";
import { handleControllerError } from "../errors";
import { HttpStatus } from "../enums/ResponseCodes";

export default class ActivityLogController {
  private service = new ActivityLogService();

  async create(req: Request, res: Response) {
    try {
      const log = await this.service.create(req.body);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Activity log created",
        data: log,
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
      const log = await this.service.getById(id);
      if (!log) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Activity log not found" });
      }
      res.status(HttpStatus.OK).json(log);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const logs = await this.service.getByUserId(userId);
      res.status(HttpStatus.OK).json(logs);
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

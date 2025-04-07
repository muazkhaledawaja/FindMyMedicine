import { Request, Response } from "express";
import {OrderItemService} from "../services";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class OrderItemController {
  private service = new OrderItemService();

  async createItem(req: Request, res: Response) {
    try {
      const item = await this.service.createItem(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "Order item created",
        data: item,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getItems(req: Request, res: Response) {
    try {
      const items = await this.service.getAllItems();
      res.status(HttpStatus.OK).json(items);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const item = await this.service.getItemById(id);
      if (!item) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "Order item not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(item);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getItemsByOrder(req: Request, res: Response) {
    try {
      const orderId = parseInt(req.params.orderId);
      const items = await this.service.getItemsByOrderId(orderId);
      res.status(HttpStatus.OK).json(items);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.service.updateItem(id, req.body);
      res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.deleteItem(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteItemsByOrder(req: Request, res: Response) {
    try {
      const orderId = parseInt(req.params.orderId);
      const count = await this.service.deleteItemsByOrder(orderId);
      res.status(HttpStatus.OK).json({ deletedCount: count });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

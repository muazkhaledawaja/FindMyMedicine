import { Request, Response } from "express";
import {OrderService} from "../services";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class OrderController {
  private orderService = new OrderService();

  async createOrder(req: Request, res: Response) {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "Order created successfully",
        data: order,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getOrders();
      res.status(HttpStatus.OK).json(orders);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "Order not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(order);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getOrdersByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const orders = await this.orderService.getOrdersByUser(userId);
      res.status(HttpStatus.OK).json(orders);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getOrdersByPharmacy(req: Request, res: Response) {
    try {
      const pharmacyId = parseInt(req.params.pharmacyId);
      const orders = await this.orderService.getOrdersByPharmacy(pharmacyId);
      res.status(HttpStatus.OK).json(orders);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.orderService.updateOrder(id, req.body);
      res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.orderService.deleteOrder(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

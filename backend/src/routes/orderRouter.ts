import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import OrderController from "../controllers/OrderController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const orderController = container.resolve(OrderController);
const orderRouter = Router();

orderRouter.post("/", authAndRoleMiddleware([UserRoles.admin, UserRoles.customer]), (req, res, next) =>
  orderController.createOrder(req, res).catch(next)
);

orderRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  orderController.getOrders(req, res).catch(next)
);

orderRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  orderController.getOrderById(req, res).catch(next)
);

orderRouter.get("/user/:userId", authAndRoleMiddleware([UserRoles.admin, UserRoles.customer]), (req, res, next) =>
  orderController.getOrdersByUser(req, res).catch(next)
);

orderRouter.get("/pharmacy/:pharmacyId", authAndRoleMiddleware([UserRoles.admin, UserRoles.pharmacy]), (req, res, next) =>
  orderController.getOrdersByPharmacy(req, res).catch(next)
);

orderRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  orderController.updateOrder(req, res).catch(next)
);

orderRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  orderController.deleteOrder(req, res).catch(next)
);

export default orderRouter;

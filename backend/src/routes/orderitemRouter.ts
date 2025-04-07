import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import OrderItemController from "../controllers/OrderItemController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const controller = container.resolve(OrderItemController);
const orderItemRouter = Router();

orderItemRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.createItem(req, res).catch(next)
);

orderItemRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getItems(req, res).catch(next)
);

orderItemRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getItemById(req, res).catch(next)
);

orderItemRouter.get("/order/:orderId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getItemsByOrder(req, res).catch(next)
);

orderItemRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.updateItem(req, res).catch(next)
);

orderItemRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.deleteItem(req, res).catch(next)
);

orderItemRouter.delete("/order/:orderId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.deleteItemsByOrder(req, res).catch(next)
);

export default orderItemRouter;

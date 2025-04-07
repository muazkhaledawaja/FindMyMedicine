import { Router } from "express";
import { container } from "tsyringe";
import DeliveryProfileController from "../controllers/DeliveryProfileController";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";
import { UserRoles } from "../enums";

const deliveryProfileRouter = Router();
const controller = container.resolve(DeliveryProfileController);

deliveryProfileRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.create(req, res).catch(next)
);

deliveryProfileRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getAll(req, res).catch(next)
);

deliveryProfileRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getById(req, res).catch(next)
);

deliveryProfileRouter.get("/user/:userId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getByUserId(req, res).catch(next)
);

deliveryProfileRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.update(req, res).catch(next)
);

deliveryProfileRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export default deliveryProfileRouter;

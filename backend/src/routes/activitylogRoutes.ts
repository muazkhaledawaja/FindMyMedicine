import { Router } from "express";
import { container } from "tsyringe";
import ActivityLogController from "../controllers/ActivityLogController";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";
import { UserRoles } from "../enums";

const activityLogRouter = Router();
const controller = container.resolve(ActivityLogController);

activityLogRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.create(req, res).catch(next)
);

activityLogRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getAll(req, res).catch(next)
);

activityLogRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getById(req, res).catch(next)
);

activityLogRouter.get("/user/:userId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getByUserId(req, res).catch(next)
);

activityLogRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.update(req, res).catch(next)
);

activityLogRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export default activityLogRouter;

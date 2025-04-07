import { Router } from "express";
import { container } from "tsyringe";
import UserReviewController from "../controllers/UserReviewController";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";
import { UserRoles } from "../enums";

const userReviewRouter = Router();
const controller = container.resolve(UserReviewController);

userReviewRouter.post("/", authAndRoleMiddleware([UserRoles.admin, UserRoles.customer]), (req, res, next) =>
  controller.create(req, res).catch(next)
);

userReviewRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getAll(req, res).catch(next)
);

userReviewRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getById(req, res).catch(next)
);

userReviewRouter.get("/reviewer/:reviewerId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getByReviewer(req, res).catch(next)
);

userReviewRouter.get("/reviewed/:reviewedUserId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getByReviewedUser(req, res).catch(next)
);

userReviewRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.update(req, res).catch(next)
);

userReviewRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export default userReviewRouter;

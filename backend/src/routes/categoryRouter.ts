import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import CategoryController from "../controllers/CategoryController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const categoryController = container.resolve(CategoryController);
const categoryRouter = Router();

categoryRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  categoryController.createCategory(req, res).catch(next)
);

categoryRouter.get("/", (req, res, next) =>
  categoryController.getCategories(req, res).catch(next)
);

categoryRouter.get("/:id", (req, res, next) =>
  categoryController.getCategoryById(req, res).catch(next)
);

categoryRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  categoryController.updateCategory(req, res).catch(next)
);

categoryRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  categoryController.deleteCategory(req, res).catch(next)
);

export default categoryRouter;

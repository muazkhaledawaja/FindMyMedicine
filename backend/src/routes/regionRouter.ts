import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import RegionController from "../controllers/RegionController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const regionController = container.resolve(RegionController);
const regionRouter = Router();

regionRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  regionController.createRegion(req, res).catch(next)
);

regionRouter.get("/", (req, res, next) =>
  regionController.getRegions(req, res).catch(next)
);

regionRouter.get("/:id", (req, res, next) =>
  regionController.getRegionById(req, res).catch(next)
);

regionRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  regionController.updateRegion(req, res).catch(next)
);

regionRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  regionController.deleteRegion(req, res).catch(next)
);

export default regionRouter;

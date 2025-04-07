import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import CityController from "../controllers/CityController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const cityController = container.resolve(CityController);
const cityRouter = Router();

cityRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  cityController.createCity(req, res).catch(next)
);

cityRouter.get("/", (req, res, next) =>
  cityController.getCities(req, res).catch(next)
);

cityRouter.get("/:id", (req, res, next) =>
  cityController.getCityById(req, res).catch(next)
);

cityRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  cityController.updateCity(req, res).catch(next)
);

cityRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  cityController.deleteCity(req, res).catch(next)
);

export default cityRouter;

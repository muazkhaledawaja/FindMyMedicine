import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import PharmacyController from "../controllers/PharmacyController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const pharmacyController = container.resolve(PharmacyController);
const pharmacyRouter = Router();

pharmacyRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  pharmacyController.createPharmacy(req, res).catch(next)
);

pharmacyRouter.get("/", (req, res, next) =>
  pharmacyController.getPharmacies(req, res).catch(next)
);

pharmacyRouter.get("/:id", (req, res, next) =>
  pharmacyController.getPharmacyById(req, res).catch(next)
);

pharmacyRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  pharmacyController.updatePharmacy(req, res).catch(next)
);

pharmacyRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  pharmacyController.deletePharmacy(req, res).catch(next)
);

export default pharmacyRouter;

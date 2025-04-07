import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import MedicineController from "../controllers/MedicineController";
import { UserRoles } from "../enums";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const medicineController = container.resolve(MedicineController);
const medicineRouter = Router();

medicineRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  medicineController.createMedicine(req, res).catch(next)
);

medicineRouter.get("/", (req, res, next) =>
  medicineController.getMedicines(req, res).catch(next)
);

medicineRouter.get("/:id", (req, res, next) =>
  medicineController.getMedicineById(req, res).catch(next)
);

medicineRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  medicineController.updateMedicine(req, res).catch(next)
);

medicineRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  medicineController.deleteMedicine(req, res).catch(next)
);

export default medicineRouter;

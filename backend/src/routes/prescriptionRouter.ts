import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import PrescriptionController from "../controllers/PrescriptionController";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";
import { UserRoles } from "../enums";

const controller = container.resolve(PrescriptionController);
const prescriptionRouter = Router();

prescriptionRouter.post("/", authAndRoleMiddleware([UserRoles.admin, UserRoles.doctor]), (req, res, next) =>
  controller.createPrescription(req, res).catch(next)
);

prescriptionRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getAll(req, res).catch(next)
);

prescriptionRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getById(req, res).catch(next)
);

prescriptionRouter.get("/user/:userId", authAndRoleMiddleware([UserRoles.admin, UserRoles.customer]), (req, res, next) =>
  controller.getByUser(req, res).catch(next)
);

prescriptionRouter.get("/doctor/:doctorId", authAndRoleMiddleware([UserRoles.admin, UserRoles.doctor]), (req, res, next) =>
  controller.getByDoctor(req, res).catch(next)
);

prescriptionRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.update(req, res).catch(next)
);

prescriptionRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export default prescriptionRouter;

import { Router } from "express";
import { container } from "tsyringe";
import PharmacyMedicineController from "../controllers/PharmacyMedicineController";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";
import { UserRoles } from "../enums";

const pharmacyMedicineRouter = Router();
const controller = container.resolve(PharmacyMedicineController);

pharmacyMedicineRouter.post("/", authAndRoleMiddleware([UserRoles.admin, UserRoles.pharmacy]), (req, res, next) =>
  controller.create(req, res).catch(next)
);

pharmacyMedicineRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.getAll(req, res).catch(next)
);

pharmacyMedicineRouter.get("/pharmacy/:pharmacyId", (req, res, next) =>
  controller.getByPharmacy(req, res).catch(next)
);

pharmacyMedicineRouter.get("/medicine/:medicineId", (req, res, next) =>
  controller.getByMedicine(req, res).catch(next)
);

pharmacyMedicineRouter.patch("/stock", authAndRoleMiddleware([UserRoles.admin, UserRoles.pharmacy]), (req, res, next) =>
  controller.updateStock(req, res).catch(next)
);

pharmacyMedicineRouter.delete("/:pharmacyId/:medicineId", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export default pharmacyMedicineRouter;

import { Router } from "express";
import { container } from "tsyringe";
import PharmacyProfileController from "../controllers/PharmacyProfileController";
import authAndRoleMiddleware from "../middleware/AuthMiddleware";
import { UserRoles } from "../enums";

const pharmacyProfileRouter = Router();
const controller = container.resolve(PharmacyProfileController);

pharmacyProfileRouter.post("/", authAndRoleMiddleware([UserRoles.admin, UserRoles.pharmacy]), (req, res, next) =>
    controller.create(req, res).catch(next)
);

pharmacyProfileRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
    controller.getAll(req, res).catch(next)
);

pharmacyProfileRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
    controller.getById(req, res).catch(next)
);

pharmacyProfileRouter.get("/user/:userId", authAndRoleMiddleware([UserRoles.admin, UserRoles.pharmacy]), (req, res, next) =>
    controller.getByUserId(req, res).catch(next)
);

pharmacyProfileRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
    controller.update(req, res).catch(next)
);

pharmacyProfileRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), (req, res, next) =>
    controller.delete(req, res).catch(next)
);

export default pharmacyProfileRouter;

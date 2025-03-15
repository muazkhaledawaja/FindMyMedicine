import { Router } from "express";
import { container } from "tsyringe";
import { RoleController } from "../controllers";

const roleController = container.resolve(RoleController);
const roleRouter = Router();

roleRouter.post("/", (req, res, next) => {
    roleController.createRole(req, res).catch(next);
});

roleRouter.get("/", (req, res, next) => {
    roleController.getRoles(req, res).catch(next);
});

export default roleRouter;

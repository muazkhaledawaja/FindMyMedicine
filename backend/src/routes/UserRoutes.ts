import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers";
import { UserRoles } from './../enums/';
import authAndRoleMiddleware from "../middleware/AuthMiddleware";

const userController = container.resolve(UserController);
const userRouter = Router();

userRouter.post("/", authAndRoleMiddleware([UserRoles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/", authAndRoleMiddleware([UserRoles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.getUsers(req, res);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/:id", authAndRoleMiddleware([UserRoles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.getUserById(req, res);
    } catch (error) {
        next(error);
    }
});

userRouter.patch("/:id", authAndRoleMiddleware([UserRoles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.updateUser(req, res);
    } catch (error) {
        next(error);
    }
});

userRouter.delete("/:id", authAndRoleMiddleware([UserRoles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

userRouter.patch("/:id/change-password", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.changePassword(req, res);
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:id/change-role", authAndRoleMiddleware([UserRoles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.changeUserRole(req, res);
    } catch (error) {
        next(error);
    }
});

export default userRouter;

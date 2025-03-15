import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers";
import {
    validateLogin,
    validateRegister,
    validateLogout,
    validateRequestPasswordReset,
    validateResetPasswordUsingToken
} from '../validations'

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post("/register",
    validateRegister,
    (req: Request, res: Response, next: NextFunction) => {
        authController.registerUser(req, res).catch(next);
    });

authRouter.post("/login",
    validateLogin,
    (req: Request, res: Response, next: NextFunction) => {
        authController.loginUser(req, res).catch(next);
    });

authRouter.post("/logout",
    validateLogout,
    (req: Request, res: Response, next: NextFunction) => {
        authController.logoutUser(req, res).catch(next);
    });

authRouter.post("/reset-password-token",
    validateResetPasswordUsingToken,
    (req: Request, res: Response, next: NextFunction) => {
        authController.resetPasswordUsingToken(req, res).catch(next);
    })

export default authRouter;

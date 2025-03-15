import { Request, Response } from "express";
import { AuthService, PasswordService } from "../services";
import { HttpStatus } from "../enums/ResponseCodes";
import { AuthenticatedRequest } from "../helpers";
import { handleControllerError } from "../errors";

export default class AuthController {

    private authService: AuthService;
    private passwordService: PasswordService;

    constructor() {
        this.authService = new AuthService();
        this.passwordService = new PasswordService();
    }

    async registerUser(req: Request, res: Response) {
        const {
            username,
            email,
            password,
            gender,
            phone_number
        } = req.body;

        try {
            const { token } = await this.authService.registerUser({
                username,
                email,
                password,
                gender,
                phone_number,
            })
            res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                success: true,
                message: "User created successfully",
                timestamp: new Date().toISOString(),
                token,
            });
        } catch (error) {
            console.error("Register user error:", error);
            handleControllerError(error, res);
        }
    }

    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const token = await this.authService.loginUser(email, password);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User logged in successfully",
                data: token,
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            console.error("logging user in error:", error);
            handleControllerError(error, res);
        }
    }

    async logoutUser(req: Request, res: Response) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                status: HttpStatus.UNAUTHORIZED,
                success: false,
                message: "Authorization header missing",
                timestamp: new Date().toISOString(),
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                status: HttpStatus.UNAUTHORIZED,
                success: false,
                message: "Token is missing from header",
                timestamp: new Date().toISOString(),
            });
        }

        try {
            await this.authService.logoutUser(token);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "Logged out successfully",
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            console.error("logging out user error:", error);
            handleControllerError(error, res);
        }
    }

    async resetPassword(req: AuthenticatedRequest, res: Response) {
        const user = req.user;
        if (!user) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                success: false,
                message: "User is not authenticated",
                timestamp: new Date().toISOString(),
            });
        }

        const { newPassword } = req.body;

        try {
            await this.passwordService.resetPassword(user.id, newPassword);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "Password reset successfully",
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            console.error("Error resetting password: ", error);
            handleControllerError(error, res);
        }
    }

    async resetPasswordUsingToken(req: Request, res: Response) {
        const { token, newPassword } = req.body;

        try {
            await this.passwordService.resetPasswordUsingToken(token, newPassword);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "Password reset successfully",
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            console.error("An error occurred while resetting password: ", error);
            handleControllerError(error, res);
        }
    }


}
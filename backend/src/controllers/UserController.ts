import { Request, Response } from "express";
import { UserService } from "../services";
import { UserDTO } from "../dto";
import { HttpStatus } from "../enums/ResponseCodes";
import {
    handleControllerError
} from "../errors";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response) {
        try {
            const userData: UserDTO = req.body;
            const user = await this.userService.createUser(userData);
            return res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                success: true,
                message: "User created successfully",
                timestamp: new Date().toISOString(),
                data: user,
            });
        } catch (error) {
            console.error("Register user error:", error);
            handleControllerError(error, res);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const filters = req.query.username || req.query.email ? req.query : {};

            const usersData = await this.userService.getUsers(page, limit, filters);

            return res.json(usersData);
        } catch (error: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            if (!user || user === null) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User retrieved successfully",
                timestamp: new Date().toISOString(),
                data: user,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async getUserByUsername(req: Request, res: Response) {
        try {
            const username = req.params.username;
            const user = await this.userService.getUserByUsername(username);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User retrieved successfully",
                timestamp: new Date().toISOString(),
                data: user,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User retrieved successfully",
                timestamp: new Date().toISOString(),
                data: user,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const userData: UserDTO = req.body;
            const user = await this.userService.updateUser(id, userData);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User updated successfully",
                timestamp: new Date().toISOString(),
                data: user,
            });
        } catch (error: any) {
            console.error("Register user error:", error);
            handleControllerError(error, res);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.deleteUser(id);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User deleted successfully",
                timestamp: new Date().toISOString(),
                data: user,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            const { oldPassword, newPassword } = req.body;
            const user = await this.userService.getUserById(userId);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            const result = await this.userService.changePassword(
                userId,
                oldPassword,
                newPassword,
            );
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User password updated successfully",
                timestamp: new Date().toISOString(),
                data: result,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            const verifiedUser = await this.userService.verifyUser(id);
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User verified successfully",
                timestamp: new Date().toISOString(),
                data: verifiedUser,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async checkUserVerification(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            const verifiedUser = await this.userService.isUserVerified(id);

            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User is verified",
                timestamp: new Date().toISOString(),
                data: verifiedUser,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async changeUserRole(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { role } = req.body;
            const user = await this.userService.getUserById(id);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "User not found",
                    timestamp: new Date().toISOString(),
                });
            }
            const updatedUser = await this.userService.changeUserRole(id, role);
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "User role updated successfully",
                timestamp: new Date().toISOString(),
                data: updatedUser,
            });
        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }



}
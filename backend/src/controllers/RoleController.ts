import { Request, Response } from "express";
import { RoleService } from "../services";
import { RoleDTO } from "../dto";
import { HttpStatus } from "../enums/ResponseCodes";

export default class RoleController {
    private roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    async createRole(req: Request, res: Response) {
        try {
            const roleData = req.body as RoleDTO;

            const role = await this.roleService.createRole(roleData);

            return res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                success: true,
                message: "Role created successfully",
                timestamp: new Date().toISOString(),
                data: role,
            });
        } catch (error: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }

    async getRoles(req: Request, res: Response) {
        try {
            const roles = await this.roleService.getRoles();
            return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                message: "Roles fetched successfully",
                timestamp: new Date().toISOString(),
                data: roles,
            });
        } catch (error: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }
    }




}
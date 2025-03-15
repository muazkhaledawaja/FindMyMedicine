import { Role } from "../models";
import {
    InternalServerError,
    NotFoundError,
    BadRequestError
} from "../errors";
import { roleRepository } from "../data-access";
import { RoleDTO } from "../dto";
import { Logger } from "../helpers/Logger";


export default class RoleService {

    async createRole(roleData: RoleDTO): Promise<Role> {
        try {
            const existingRole = await roleRepository.findByName(roleData.role_name);
            if (existingRole) {
                throw new BadRequestError("Role already exists");
            }
            const newRole = new Role()
            newRole.role_name = roleData.role_name;
            await roleRepository.create(newRole);
            Logger.info(`Role ${newRole.role_name} created successfully`);
            return newRole;

        } catch (error: any) {
            Logger.error(error);
            throw new InternalServerError("Internal server error");
        }
    }

    async getRoles(): Promise<Role[] | null> {
        try {
            const roles = await roleRepository.findAll();
            Logger.log("Fetched roles:", roles);
            return roles;
        } catch (error: any) {
            Logger.error(error);
            throw new InternalServerError("Internal server error");
        }
    }

    async getRoleById(id: number): Promise<Role> {
        const role = await roleRepository.findById(id);
        if (!role) throw new NotFoundError("Role not found.");
        return role;
    }

    async updateRole(id: number, data: Partial<RoleDTO>): Promise<Role> {
        const role = await roleRepository.findById(id);
        if (!role) throw new NotFoundError("Role not found.");
        Object.assign(role, data);
        await roleRepository.update(id, data);
        return role;
    }

    async deleteRole(id: number): Promise<void> {
        const role = await roleRepository.findById(id);
        if (!role) throw new NotFoundError("Role not found.");
        await roleRepository.delete(id);
    }

}
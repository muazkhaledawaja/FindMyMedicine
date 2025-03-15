import { Role } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IRoleRepository extends IRepository<Role> {
  findByName(role_name: string): Promise<Role | null>;
  updateRole(id: number, roleData: Role): Promise<Role | null>;
  deleteRole(id: number): Promise<boolean>;
}

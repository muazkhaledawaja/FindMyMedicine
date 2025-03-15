import { Role } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IRoleRepository } from "./interface/IRoleRepository";

export class RoleRepository
  extends RepositoryBase<Role>
  implements IRoleRepository
  
{

  async findByName(role_name: string): Promise<Role | null> {
    const role = await this.model.findOne({ where: { role_name } });
    return role;
  }

  async updateRole(id: number, roleData: Role): Promise<Role | null> {
    const [_, [updatedRole]] = await this.model.update<Role>(roleData, {
      where: { id },
      returning: true,
    });
    return updatedRole;
  }

  async deleteRole(id: number): Promise<boolean> {
    const role = await this.model.findByPk(id);
    if (role !== null) {
      await role.destroy();
      return true;
    }
    return false;
  }
}

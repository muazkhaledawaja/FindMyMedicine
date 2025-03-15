import { User } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IUserRepository } from "./interface/IUserRepository";
import { Op } from "sequelize";

export class UserRepository
  extends RepositoryBase<User>
  implements IUserRepository {

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { username } });
    return user
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return await this.model.findOne({ where: { phone_number: phoneNumber } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findOne({ where: { email } });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    try {
      const [affectedRows] = await this.model.update(userData, {
        where: { id },
      });
      return affectedRows > 0 ? await this.findById(id) : null;
    } catch (error) {
      console.error("Error in updateUser repository:", error);
      throw new Error("Failed to update user");
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }

  async getDeletedUsers(): Promise<User[]> {
    return await this.model.findAll({ paranoid: false });
  }

  async getActiveUsers(): Promise<User[]> {
    return await this.model.findAll({ where: { is_active: true } });
  }

  async findAndCountAll(
    page: number = 1,
    limit: number = 10,
    filters: any = {},
  ): Promise<{ count: number; rows: User[] }> {
    const offset = (page - 1) * limit;

    // Build the filtering conditions
    const filterConditions: any = {};

    // Validate the filters
    if (filters.username && typeof filters.username === 'string') {
      filterConditions["username"] = { [Op.like]: `%${filters.username}%` };
    }
    if (filters.email && typeof filters.email === 'string') {
      filterConditions["email"] = { [Op.like]: `%${filters.email}%` };
    }
    if (filters.role && typeof filters.role === 'string') {
      filterConditions["role"] = filters.role;
    }
    if (filters.phone_number && typeof filters.phone_number === 'string') {
      filterConditions["phone_number"] = { [Op.like]: `%${filters.phone_number}%` };
    }

    try {
      // Fetch users with filtering, offset, and limit
      const result = await this.model.findAndCountAll({
        where: filterConditions,
        offset,
        limit,
      });

      return result;
    } catch (error) {
      console.error("Error in findAndCountAll repository:", error);
      throw new Error("Failed to fetch users with pagination");
    }
  }

}

import { User } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByPhoneNumber(phone_number: string): Promise<User | null>;
  updateUser(id: number, userData: User): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
  getDeletedUsers(): Promise<User[]>;
  getActiveUsers(): Promise<User[]>;
}

import { Medicine } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IMedicineRepository extends IRepository<Medicine> {
  findByName(name: string): Promise<Medicine | null>;
  updateMedicine(id: number, data: Partial<Medicine>): Promise<Medicine | null>;
  deleteMedicine(id: number): Promise<boolean>;
}

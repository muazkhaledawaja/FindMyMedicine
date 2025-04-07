import { Pharmacy } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IPharmacyRepository extends IRepository<Pharmacy> {
  findByName(name: string): Promise<Pharmacy | null>;
  updatePharmacy(id: number, pharmacyData: Partial<Pharmacy>): Promise<Pharmacy | null>;
  deletePharmacy(id: number): Promise<boolean>;
}

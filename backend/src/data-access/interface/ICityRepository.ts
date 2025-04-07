import { City } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface ICityRepository extends IRepository<City> {
  findByName(name: string): Promise<City | null>;
  updateCity(id: number, cityData: Partial<City>): Promise<City | null>;
  deleteCity(id: number): Promise<boolean>;
}

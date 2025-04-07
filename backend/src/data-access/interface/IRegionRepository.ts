import { Region } from "../../models";
import { IRepository } from "./IRepositoryBase";

export interface IRegionRepository extends IRepository<Region> {
  findByName(name: string): Promise<Region | null>;
  updateRegion(id: number, regionData: Partial<Region>): Promise<Region | null>;
  deleteRegion(id: number): Promise<boolean>;
}

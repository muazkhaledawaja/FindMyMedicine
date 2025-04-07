import { Region } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { IRegionRepository } from "./interface/IRegionRepository";

export class RegionRepository
  extends RepositoryBase<Region>
  implements IRegionRepository {

  async findByName(name: string): Promise<Region | null> {
    return await this.model.findOne({ where: { name } });
  }

  async updateRegion(id: number, regionData: Partial<Region>): Promise<Region | null> {
    const [affectedRows] = await this.model.update(regionData, { where: { id } });
    return affectedRows > 0 ? await this.findById(id) : null;
  }

  async deleteRegion(id: number): Promise<boolean> {
    const region = await this.findById(id);
    if (region) {
      await region.destroy();
      return true;
    }
    return false;
  }
}

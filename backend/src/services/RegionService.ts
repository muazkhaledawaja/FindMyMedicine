import { Region } from "../models";
import { regionRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class RegionService {
  async createRegion(data: Partial<Region>): Promise<Region> {
    return await regionRepository.create(data);
  }

  async getAllRegions(): Promise<Region[]> {
    return await regionRepository.findAll();
  }

  async getRegionById(id: number): Promise<Region | null> {
    return await regionRepository.findById(id);
  }

  async updateRegion(id: number, data: Partial<Region>): Promise<Region | null> {
    const region = await regionRepository.findById(id);
    if (!region) throw new NotFoundError("Region not found");
    return await regionRepository.update(id, data);
  }

  async deleteRegion(id: number): Promise<boolean> {
    return await regionRepository.delete(id);
  }
}

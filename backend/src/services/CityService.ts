import { City } from "../models";
import { cityRepository } from "../data-access";
import { NotFoundError } from "../errors";

export default class CityService {
  async createCity(data: Partial<City>): Promise<City> {
    return await cityRepository.create(data);
  }

  async getAllCities(): Promise<City[]> {
    return await cityRepository.findAll();
  }

  async getCityById(id: number): Promise<City | null> {
    return await cityRepository.findById(id);
  }

  async updateCity(id: number, data: Partial<City>): Promise<City | null> {
    const city = await cityRepository.findById(id);
    if (!city) throw new NotFoundError("City not found");
    return await cityRepository.update(id, data);
  }

  async deleteCity(id: number): Promise<boolean> {
    return await cityRepository.delete(id);
  }
}

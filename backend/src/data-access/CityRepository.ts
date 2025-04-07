import { City } from "../models";
import { RepositoryBase } from "./RepositoryBase";
import { ICityRepository } from "./interface/ICityRepository";

export class CityRepository extends RepositoryBase<City> implements ICityRepository {
  // Add custom methods here if needed
}
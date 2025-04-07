import { Request, Response } from "express";
import {CityService} from "../services";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class CityController {
  private cityService = new CityService();

  async createCity(req: Request, res: Response) {
    try {
      const city = await this.cityService.createCity(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "City created successfully",
        data: city,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getCities(req: Request, res: Response) {
    try {
      const cities = await this.cityService.getAllCities();
      res.status(HttpStatus.OK).json(cities);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getCityById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const city = await this.cityService.getCityById(id);
      if (!city) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "City not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(city);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateCity(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const city = await this.cityService.updateCity(id, req.body);
      res.status(HttpStatus.OK).json(city);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteCity(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.cityService.deleteCity(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

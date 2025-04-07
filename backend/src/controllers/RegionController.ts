import { Request, Response } from "express";
import {RegionService} from "../services";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class RegionController {
  private regionService = new RegionService();

  async createRegion(req: Request, res: Response) {
    try {
      const region = await this.regionService.createRegion(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "Region created successfully",
        data: region,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getRegions(req: Request, res: Response) {
    try {
      const regions = await this.regionService.getAllRegions();
      res.status(HttpStatus.OK).json(regions);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getRegionById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const region = await this.regionService.getRegionById(id);
      if (!region) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "Region not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(region);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateRegion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const region = await this.regionService.updateRegion(id, req.body);
      res.status(HttpStatus.OK).json(region);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteRegion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.regionService.deleteRegion(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

import { Request, Response } from "express";
import {MedicineService} from "../services/";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class MedicineController {
  private medicineService = new MedicineService();

  async createMedicine(req: Request, res: Response) {
    try {
      const medicine = await this.medicineService.createMedicine(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "Medicine created successfully",
        data: medicine,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getMedicines(req: Request, res: Response) {
    try {
      const medicines = await this.medicineService.getAllMedicines();
      res.status(HttpStatus.OK).json(medicines);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getMedicineById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const medicine = await this.medicineService.getMedicineById(id);
      if (!medicine) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "Medicine not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(medicine);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateMedicine(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.medicineService.updateMedicine(id, req.body);
      res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteMedicine(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.medicineService.deleteMedicine(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

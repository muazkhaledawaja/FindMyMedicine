import { Request, Response } from "express";
import {PharmacyMedicineService} from "../services";
import { handleControllerError } from "../errors";
import { HttpStatus } from "../enums/ResponseCodes";

export default class PharmacyMedicineController {
  private service = new PharmacyMedicineService();

  async create(req: Request, res: Response) {
    try {
      const record = await this.service.create(req.body);
      res.status(HttpStatus.CREATED).json({
        message: "Medicine added to pharmacy",
        data: record,
        success: true,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.service.getAll();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByPharmacy(req: Request, res: Response) {
    try {
      const pharmacyId = parseInt(req.params.pharmacyId);
      const data = await this.service.getByPharmacyId(pharmacyId);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByMedicine(req: Request, res: Response) {
    try {
      const medicineId = parseInt(req.params.medicineId);
      const data = await this.service.getByMedicineId(medicineId);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateStock(req: Request, res: Response) {
    try {
      const { pharmacy_id, medicine_id, stock_quantity } = req.body;
      const updated = await this.service.updateStock(pharmacy_id, medicine_id, stock_quantity);
      res.status(HttpStatus.OK).json({
        success: updated,
        message: updated ? "Stock updated" : "No update performed",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { pharmacyId, medicineId } = req.params;
      const deleted = await this.service.delete(+pharmacyId, +medicineId);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

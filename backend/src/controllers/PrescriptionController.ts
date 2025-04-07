import { Request, Response } from "express";
import PrescriptionService from "../services/PrescriptionService";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class PrescriptionController {
  private service = new PrescriptionService();

  async createPrescription(req: Request, res: Response) {
    try {
      const prescription = await this.service.createPrescription(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "Prescription created successfully",
        data: prescription,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const prescriptions = await this.service.getAllPrescriptions();
      res.status(HttpStatus.OK).json(prescriptions);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const prescription = await this.service.getPrescriptionById(id);
      if (!prescription) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "Prescription not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(prescription);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const results = await this.service.getPrescriptionsByUser(userId);
      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getByDoctor(req: Request, res: Response) {
    try {
      const doctorId = parseInt(req.params.doctorId);
      const results = await this.service.getPrescriptionsByDoctor(doctorId);
      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.service.updatePrescription(id, req.body);
      res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.deletePrescription(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

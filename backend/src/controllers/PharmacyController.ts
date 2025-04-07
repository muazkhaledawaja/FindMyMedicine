import { Request, Response } from "express";
import {PharmacyService} from "../services";

export default class PharmacyController {
  private service = new PharmacyService();

  async getPharmacies(req: Request, res: Response) {
    const data = await this.service.getAllPharmacies();
    res.json(data);
  }

  async getPharmacyById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const item = await this.service.getPharmacyById(id);
    res.json(item);
  }

  async createPharmacy(req: Request, res: Response) {
    const newItem = await this.service.createPharmacy(req.body);
    res.status(201).json(newItem);
  }

  async updatePharmacy(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const updated = await this.service.updatePharmacy(id, req.body);
    res.json(updated);
  }

  async deletePharmacy(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const success = await this.service.deletePharmacy(id);
    res.status(success ? 200 : 404).json({ success });
  }
}
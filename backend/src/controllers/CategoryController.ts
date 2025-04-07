import { Request, Response } from "express";
import {CategoryService} from "../services/";
import { HttpStatus } from "../enums/ResponseCodes";
import { handleControllerError } from "../errors";

export default class CategoryController {
  private categoryService = new CategoryService();

  async createCategory(req: Request, res: Response) {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        success: true,
        message: "Category created successfully",
        data: category,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(HttpStatus.OK).json(categories);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: "Category not found",
          timestamp: new Date().toISOString(),
        });
      }
      res.status(HttpStatus.OK).json(category);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await this.categoryService.updateCategory(id, req.body);
      res.status(HttpStatus.OK).json(category);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.categoryService.deleteCategory(id);
      res.status(HttpStatus.OK).json({ success: deleted });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

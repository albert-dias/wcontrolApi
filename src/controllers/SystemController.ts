import { Request, Response } from "express";
import { CreatePaymentTypesService } from "../services/CreatePaymentTypesService";
import { ListPaymentTypesService } from "../services/ListPaymentTypesService";
import { CreateColorService } from "../services/CreateColorService";
import { ListColorService } from "../services/ListColorService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

export class SystemController {
  async initial(req: Request, res: Response): Promise<Response> {
    try {
      const payments = await ListPaymentTypesService();
      const colors = await ListColorService();
      const response = { payments, colors };

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createPaymentTypes(req: Request, res: Response): Promise<Response> {
    try {
      const { description } = req.body;

      const response = await CreatePaymentTypesService({
        name: description,
      });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listPaymentTypes(req: Request, res: Response): Promise<Response> {
    try {
      const response = await ListPaymentTypesService();

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async createColors(req: Request, res: Response): Promise<Response> {
    try {
      const { name, hex } = req.body;

      const response = await CreateColorService({
        name,
        hex,
      });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async listColors(req: Request, res: Response): Promise<Response> {
    try {
      const response = await ListColorService();

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

import { Request, Response } from "express";
import { CreateTransactionService } from "../services/CreateTransactionService";
import { ListTransactionsDayService } from "../services/ListTransactionsDayService";
import { ResumeTransactionService } from "../services/ResumeTransactionsMonthService";
import { UpdateTransactionService } from "../services/UpdateTransactionService";
import { ResumeTransactionTotalService } from "../services/ResumeTransactionsTotalService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

export class TransactionsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { service_id, color_id, payment_id, car_plate, value } = req.body;

      const response = await CreateTransactionService({
        user_id: id,
        service_id,
        color_id,
        payment_id,
        car_plate,
        value,
      });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const response = await ListTransactionsDayService({ user_id: id });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { transaction_id, payment_id } = req.body;

      const response = await UpdateTransactionService({
        transaction_id,
        payment_id,
      });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async resume(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { date } = req.body;

      const response = await ResumeTransactionService({ user_id: id, date });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async resumeTotal(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const response = await ResumeTransactionTotalService({ user_id: id });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

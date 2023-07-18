import { Request, Response } from "express";
import { CreateUserServicesService } from "../services/CreateUserServicesService";
import { ListUserServicesService } from "../services/ListUserServicesService";
import { UpdateUserServicesService } from "../services/UpdateUserServicesService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}

export class ServicesController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { description, value } = req.body;

      const response = await CreateUserServicesService({
        user_id: id,
        description,
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

      const response = await ListUserServicesService({
        user_id: id,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // async forgot(req: Request, res: Response): Promise<Response> {
  //   try {

  //     return res.status(201).json({ message: 'success' });
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  // async show(req: Request, res: Response): Promise<Response> {

  //   try {
  //     const { id } = req.user;

  //     const user = await ShowUserService({ user_id: id });

  //     return res.status(200).json(user);
  //   } catch (error: any) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { service_id } = req.params;
      const { value, description } = req.body;

      const response = await UpdateUserServicesService({
        service_id,
        value,
        description,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // async updatepass(req: Request, res: Response): Promise<Response> {

  //   try {

  //     return res.status(200).json(user);
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }
}

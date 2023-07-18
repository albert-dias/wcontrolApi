import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ShowUserService } from "../services/ShowUserService";

interface IFile extends Express.Multer.File {
  key: string;
  location: string;
}


export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, lastname, phone, password } = req.body;

      const user = await CreateUserService({ email, name, lastname, phone, password })

      return res.status(201).json(user);
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

  async show(req: Request, res: Response): Promise<Response> {

    try {
      const { id } = req.user;

      const user = await ShowUserService({ user_id: id });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {

    try {
      const { id } = req.user;
      const file = req.file as IFile;

      const user = await ShowUserService({ user_id: id });

      return res.status(200).json(user);
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
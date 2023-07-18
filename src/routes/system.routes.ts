import { Router } from "express";
import { SystemController } from "../controllers/SystemController";

import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const systemController = new SystemController();
const systemRouter = Router();

import multer from "multer";
import uploadConfig from "../config/upload";

const upload = multer(uploadConfig);

systemRouter.get("/", systemController.initial);
systemRouter.post("/paymenttype", systemController.createPaymentTypes);
systemRouter.get("/paymenttype", systemController.listPaymentTypes);
systemRouter.post("/colors", systemController.createColors);
systemRouter.get("/colors", systemController.listColors);
// systemRouter.post("/forgot", systemController.forgot);
// systemRouter.post("/updatpass", systemController.updatepass);

export default systemRouter;

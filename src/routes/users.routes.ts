import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ServicesController } from "../controllers/ServicesController";
import { TransactionsController } from "../controllers/TransactionsController";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const usersController = new UsersController();
const servicesController = new ServicesController();
const transactionsController = new TransactionsController();
const usersRouter = Router();
const servicesRouter = Router();

import multer from "multer";
import uploadConfig from "../config/upload";

const upload = multer(uploadConfig);

//USUARIO
usersRouter.post("/", usersController.create);
// usersRouter.post("/forgot", usersController.forgot);
// usersRouter.post("/updatpass", usersController.updatepass);
usersRouter.get("/me", ensureAuthenticate, usersController.show);
usersRouter.post(
  "/me/avatar",
  ensureAuthenticate,
  upload.single("avatar"),
  usersController.update
);

//SERVICOS
usersRouter.post("/services", ensureAuthenticate, servicesController.create);
usersRouter.get("/services", ensureAuthenticate, servicesController.list);
usersRouter.put(
  "/services/:service_id",
  ensureAuthenticate,
  servicesController.update
);

//TRANSACOES
usersRouter.post(
  "/transactions",
  ensureAuthenticate,
  transactionsController.create
);
usersRouter.get(
  "/transactions",
  ensureAuthenticate,
  transactionsController.list
);
usersRouter.post(
  "/transactions/resume",
  ensureAuthenticate,
  transactionsController.resume
);

usersRouter.post(
  "/transactions/resume-total",
  ensureAuthenticate,
  transactionsController.resumeTotal
);

usersRouter.post(
  "/transactions/update",
  ensureAuthenticate,
  transactionsController.update
);

export default usersRouter;

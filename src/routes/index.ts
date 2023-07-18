import { Router } from "express";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import systemRouter from "./system.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/system", systemRouter);

routes.get("/", (req, res) => res.json({ result: "Bem-Vindo ao WCrontrol" }));

export default routes;

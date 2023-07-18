import { Router } from "express";

import { AuthenticatedUserService } from "../services/AuthenticatedUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await AuthenticatedUserService({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
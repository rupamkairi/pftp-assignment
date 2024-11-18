import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

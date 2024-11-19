import { Router } from "express";
import { locationsRouter } from "./locations";

export const apiRouter = Router();

apiRouter.get("/", async (req, res) => {
  res.sendStatus(200);
});

apiRouter.use("/locations", locationsRouter);

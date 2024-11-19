import { Router } from "express";
import { prisma } from "../prisma";

export const locationsRouter = Router();

const locations = [
  {
    name: "Taj Mahal",
    location: [{ lat: 27.1741, long: 78.0408 }],
  },
  {
    name: "Victoria Memorial",
    location: [{ lat: 28.1111, long: 77.1111 }],
  },
];

locationsRouter.get("/", async (req, res) => {
  const _locations = await prisma.location.findMany();

  res.json(_locations);
});

locationsRouter.post("/", async (req, res) => {
  const { body } = req;
  const _location = await prisma.location.create({
    data: body,
  });

  res.json(_location);
});

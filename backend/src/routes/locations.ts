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
  const _locations = await prisma.location.findMany({
    where: { deleted: false },
  });

  res.json(_locations);
});

locationsRouter.post("/", async (req, res) => {
  const { body } = req;

  const _location = await prisma.location.create({
    data: body,
  });

  res.json(_location);
});

locationsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const _location = await prisma.location.update({
    where: { id: +id, deleted: false },
    data: { ...body, updatedAt: new Date() },
  });

  res.json(_location);
});

locationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const _location = await prisma.location.update({
    where: { id: +id, deleted: false },
    data: { deleted: true, updatedAt: new Date() },
  });

  res.json(_location);
});

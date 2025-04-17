import { Request, Response } from "express";
import { prisma } from "@repo/db/prisma";
import { createSessionSchema } from "@repo/common/zod";
import crypto from "crypto";

export const createSession = async (req: Request, res: Response) => {
  const parsed = createSessionSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ err: parsed.error.format() });
  }
  const { canvasId } = parsed.data;
  const shareToken = crypto.randomUUID();

  try {
    const session = await prisma.session.create({
      data: {
        canvasId,
        shareToken,
      },
    });
    return res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session", error);
    return res.status(500).json({ message: "Error creating session" });
  }
};

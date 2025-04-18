import { Request, Response } from "express";
import { prisma } from "@repo/db/prisma";
import { createCanvasSchema, updateCanvasSchema } from "@repo/common/zod";

export const getCanvasById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const canvas = await prisma.canvas.findUnique({
      where: { id },
      include: { elements: true, Session: true },
    });

    if (!canvas) {
      return res.status(404).json({ message: "Canvas not found" });
    }

    return res.status(200).json(canvas);
  } catch (error) {
    console.error("[Get_Canvas_ID]", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createCanvas = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  try {
    const parsed = createCanvasSchema.safeParse(req.body);
    // const { title, userId, elements } = req.body;

    if (!parsed.success) {
      return res.status(400).json({ err: parsed.error.format() });
    }

    const { title, elements } = parsed.data;

    const newCanvas = await prisma.canvas.create({
      data: {
        title,
        user: { connect: { id: userId } },
        elements: {
          create:
            elements?.map((el: any) => ({
              type: el.type,
              x: el.x,
              y: el.y,
              width: el.width,
              height: el.height,
              props: el.props,
            })) || [],
        },
      },
      include: {
        elements: true,
      },
    });
    return res.status(201).json(newCanvas);
  } catch (error) {
    console.error("[Create_Canvas_Error]", error);
    return res.status(500).json({ message: "Error creating the canvas" });
  }
};

export const updateCanvas = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = updateCanvasSchema.safeParse(req.body);
  // const { title, elements } = req.body;
  if (!parsed.success) {
    return res.status(400).json({ err: parsed.error.format() });
  }

  const { title, elements } = parsed.data;

  try {
    const existingCanvas = await prisma.canvas.findUnique({
      where: { id },
    });
    if (!existingCanvas) {
      return res.status(400).json({ message: "Canvas not found" });
    }
    const updateCanvas = await prisma.canvas.update({
      where: { id },
      data: {
        title,
        elements: {
          update:
            elements?.map((el: any) => ({
              where: { id: el.id },
              data: {
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                props: el.props,
              },
            })) || [],
        },
      },
    });
    return res.status(200).json(updateCanvas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating the canvas" });
  }
};

export const deleteCanvas = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteCanvas = await prisma.canvas.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Canvas is deleted!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting the canvas" });
  }
};

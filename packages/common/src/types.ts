import { z } from "zod";

export const elementsSchema = z.object({
  type: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  props: z.any(),
});

export const createCanvasSchema = z.object({
  title: z.string(),
  userId: z.string().uuid(),
  elements: z.array(elementsSchema).optional(),
});

export const updateCanvasSchema = z.object({
  title: z.string(),
  elements: z.array(elementsSchema).optional(),
});

export const createSessionSchema = z.object({
  canvasId: z.string().uuid(),
});

export const getSessionSchema = z.object({
  shareToken: z.string().uuid(),
});

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

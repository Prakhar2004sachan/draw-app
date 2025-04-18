import { Request, Response } from "express";
import { loginSchema, signUpSchema } from "@repo/common/zod";
import { prisma } from "@repo/db/prisma";
import { genrateToken } from "@repo/common/jwt";

export const signup = async (req: Request, res: Response) => {
  const parsed = signUpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      err: parsed.error.format(),
    });
  }
  const { email, name, password } = parsed.data;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ err: "User already exists" });
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    const token = genrateToken({ id: newUser.id, email: newUser.email });
    res.status(200).json({ newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Error on signing up" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(404).json({ err: parsed.error.format() });
  }
  const { email, password } = parsed.data;
  console.log(email, password);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser || existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(existingUser);

    const token = genrateToken({
      id: existingUser.id,
      email: existingUser.email,
    });

    return res.status(200).json({
      message: "login successfull",
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error("Error on login", error);
    return res.status(500).json({ message: "Error on login" });
  }
};

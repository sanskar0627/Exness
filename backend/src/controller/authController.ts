import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.email("Please enter a valid email"),
  password: z.string().min(6),
});

export const signup = async (req: Request, res: Response) => {
  try {
     const { name, email, password } = signupSchema.parse(req.body);
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });

    res.status(201).json({ message: "User Register Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registarting User", error });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newuser = await prisma.user.findUnique({
      where: { email },
    });
    if (!newuser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, newuser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error in Login", error });
  }
};

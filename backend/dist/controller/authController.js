import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
const signupSchema = z.object({
    name: z.string().min(2),
    email: z.email("Please enter a valid email"),
    //in future add add confirm password(type password 2 times) with min1 Capitala & Symbol
    password: z.string().min(6),
});
export const signup = async (req, res) => {
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
        //Genrate a jwt token for new user for auto login at time of signup
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.status(201).json({ message: "User Register Sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error registarting User", error });
    }
};
export const signin = async (req, res) => {
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
        const token = jwt.sign({ id: newuser.id, email: newuser.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error in Login", error });
    }
};

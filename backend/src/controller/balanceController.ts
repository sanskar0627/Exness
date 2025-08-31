import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getBalance=async (req:any,res:Response)=>{
    const user=await prisma.user.findUnique({
        where:{id:req.user.id},
        select:{balance:true}
    });
    res.json(user);
}

export const updateBalance=async(req:any,res:Response)=>{
    const {amount}=req.body;
    const user = await prisma.user.update({
         where: { id: req.user.id },
         data: { balance: { increment: amount } },
         select: { balance: true }
    });
     res.json(user);
}
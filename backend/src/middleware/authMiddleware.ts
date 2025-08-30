import { Response ,Request , NextFunction} from "express";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authmiddleware=(req:AuthRequest ,res :Response , next: NextFunction)=>{
    const token =req.header("Authorization")?.replace("Bearer","");
    if(!token){
        return res.status(401).json({message:"No Token Found, Authorization denied"});
    }
    try{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user=decode;
        next();
    }
    catch(error){
        res.status(401).json({message:"Invalid Token"})

    }
}


import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: Response,  next: NextFunction) => {

    try {
        const token =
            req.headers.authorization
                ?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message:"No Token Found"
            });
        }
        const decoded =
            jwt.verify(
                token, process.env.JWT_SECRET || "secretkey"
            );
        req.user = decoded;
        next();
    }
    catch (error: any) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};

export default authMiddleware;
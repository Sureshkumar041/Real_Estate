import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = verifyToken(token);

        console.log(payload);

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};
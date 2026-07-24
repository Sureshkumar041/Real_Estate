import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRespository = AppDataSource.getRepository(User);

export const authMiddleware = async (
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

        const user = await userRespository.findOne({
            where: {
                userId: payload.userId
            }
        })


        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};
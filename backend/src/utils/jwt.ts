import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
    userId: number;
}

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, SECRET, {
        expiresIn: "7d",
    });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, SECRET) as JwtPayload;
};
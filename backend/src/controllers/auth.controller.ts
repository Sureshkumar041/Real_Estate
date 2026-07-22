import { Request, Response } from "express";
import * as authService from "../services/auth.service";


// REGISTER
export const register = async (req: Request, res: Response) => {
    try {
        return await authService.register(req, res);
    } catch (err: any) {
        res.status(500).json({ message: err?.message });
    }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        return await authService.login(req, res);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
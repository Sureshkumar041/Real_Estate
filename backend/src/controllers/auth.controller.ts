import { Request, Response } from "express";
import { ResponseUtil } from "../utils/response";
import authService from "../services/auth.service";


// REGISTER
export const register = async (req: Request, res: Response) => {
    try {
        const result = await authService.register(req.body);

        return ResponseUtil.success(
            res,
            "Registered successfully",
            result,
            201
        )
    } catch (error: any) {
        return ResponseUtil.error(
            res,
            error.message,
            400
        );
    }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body);

        res.cookie("accessToken", result?.token, {
            httpOnly: true,
            secure: false,  // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        })

        return ResponseUtil.success(
            res,
            "Login successful",
            result
        );

    } catch (err: any) {

        return ResponseUtil.error(
            res,
            err.message,
            err.statusCode || 500
        );

    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken");

        return ResponseUtil.success(
            res,
            "Logout successfully"
        );
    } catch (error: any) {
        return ResponseUtil.error(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
    try {
        return {
            statusCode: 200,
            status: "success",
            message: "Registered successfully",
            data: {}
        }
    } catch (error: any) {
        console.log("Error in Register API: ", error);
        return res.status(500).send({ statusCode: 500, status: "error", message: error.message });
    }
}
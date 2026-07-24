import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CategoryService from "../services/category.service";
import { ResponseUtil } from "../utils/response";

class CategoryController {

    async create(req: Request, res: Response) {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            const { name } = req.body;

            // Assuming authMiddleware attaches the user to req.user
            const user = (req as any).user;

            const category = await CategoryService.create(name, user);

            return ResponseUtil.success(
                res,
                "Category created successfully",
                category,
                201
            )

        } catch (error: any) {
            return ResponseUtil.error(
                res,
                error.message,
                400
            );
        }
    }
}

export default new CategoryController();
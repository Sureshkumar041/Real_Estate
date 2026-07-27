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

    async getAll(req: Request,
        res: Response) {
        try {
            const userId = req.user.userId;

            const result = await CategoryService.getAll(
                userId,
                req.query
            );

            return ResponseUtil.success(
                res,
                "Categories fetched successfully",
                result
            );

        } catch (error: any) {

            return ResponseUtil.error(
                res,
                error.message,
                error.statusCode || 500
            );

        }
    }

    async getById(req: Request, res: Response) {
        try {

            const categoryId = Number(req.params.id);
            const userId = req.user.userId;

            const category = await CategoryService.getById(categoryId, userId);

            return ResponseUtil.success(
                res,
                "Category fetched successfully",
                category
            );

        } catch (err: any) {

            return ResponseUtil.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    };

    async update(req: Request, res: Response) {
        try {

            const categoryId = Number(req.params.id);
            const userId = req.user.userId;

            const result = await CategoryService.update(
                categoryId,
                userId,
                req.body
            );

            return ResponseUtil.success(
                res,
                "Category updated successfully",
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

    async delete(req: Request, res: Response) {
        try {

            const categoryId = Number(req.params.id);
            const userId = req.user.userId;

            await CategoryService.delete(categoryId, userId);

            return ResponseUtil.success(
                res,
                "Category deleted successfully",
                null
            );

        } catch (err: any) {

            return ResponseUtil.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    };
}

export default new CategoryController();
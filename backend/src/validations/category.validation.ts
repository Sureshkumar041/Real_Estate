import { body } from "express-validator";

export const CreateCategoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ max: 100 })
        .withMessage("Category name cannot exceed 100 characters"),
]
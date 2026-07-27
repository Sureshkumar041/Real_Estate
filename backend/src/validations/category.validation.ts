import { body, param, query } from "express-validator";

export const CreateCategoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ max: 100 })
        .withMessage("Category name cannot exceed 100 characters"),
]


export const getCategoriesValidation = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than 0"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),

    query("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Invalid status"),

    query("sortOrder")
        .optional()
        .isIn(["ASC", "DESC", "asc", "desc"])
        .withMessage("Invalid sort order")
];

export const getCategoryByIdValidation = [
    param("id")
        .notEmpty()
        .withMessage("Category id is required")
        .isInt({ min: 1 })
        .withMessage("Invalid category id")
        .toInt(),
];

export const updateCategoryValidation = [
    param("id")
        .notEmpty()
        .withMessage("Category id is required")
        .isInt({ min: 1 })
        .withMessage("Invalid category id")
        .toInt(),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ max: 100 })
        .withMessage("Category name cannot exceed 100 characters"),
];
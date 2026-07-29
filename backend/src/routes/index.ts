import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import categoryController from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { loginValidation, registerValidation } from "../validations/auth.validation";
import { validate } from "../middleware/validation.middleware";
import { getCategoriesValidation, getCategoryByIdValidation, updateCategoryValidation } from "../validations/category.validation";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", logout);

router.post("/category/create", authMiddleware, categoryController.create);
router.get("/category/getAll", authMiddleware, getCategoriesValidation, validate, categoryController.getAll);
router.get(
    "/category/:id",
    authMiddleware,
    getCategoryByIdValidation,
    validate,
    categoryController.getById
);
router.put(
    "/category/:id",
    authMiddleware,
    updateCategoryValidation,
    validate,
    categoryController.update
);
router.delete(
    "/category/:id",
    authMiddleware,
    getCategoryByIdValidation,
    validate,
    categoryController.delete
);

export default router;
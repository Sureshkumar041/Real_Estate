import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import categoryController from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { loginValidation, registerValidation } from "../validations/auth.validation";
import { validate } from "../middleware/validation.middleware";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

router.post("/category/create", authMiddleware, categoryController.create);

export default router;
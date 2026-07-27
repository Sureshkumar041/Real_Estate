import { Not } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { CategoryStatus } from "../constants/enums";
import { Category } from "../entities/Category";
import { Expense } from "../entities/Expense";

const categoryRepository = AppDataSource.getRepository(Category),
    expenseRepository = AppDataSource.getRepository(Expense);


class CategoryService {

    async create(name: string, user: any) {

        // Check for duplicate category
        const existingCategory = await categoryRepository.findOne({
            where: {
                name,
                user: { id: user.id },
                status: Not(CategoryStatus.DELETE)
            },
        });

        if (existingCategory) {
            throw new Error("Category already exists");
        }

        const category = categoryRepository.create({
            name,
            user
        });

        return await categoryRepository.save(category);
    }

    async getAll(userId: number,
        query: any) {

        const {
            search,
            status,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "DESC"
        } = query;

        const qb = categoryRepository
            .createQueryBuilder("category")
            .leftJoin("category.user", "user")
            .where("user.userId = :userId", { userId })
            .andWhere("category.status != :status", { status: CategoryStatus.DELETE });

        if (search) {
            qb.andWhere(
                "LOWER(category.name) LIKE LOWER(:search)",
                { search: `%${search}%` }
            );
        }

        if (status) {
            qb.andWhere(
                "category.status = :status",
                { status }
            );
        }

        qb.orderBy(
            `category.${sortBy}`,
            sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC"
        );

        qb.skip((Number(page) - 1) * Number(limit));
        qb.take(Number(limit));

        const [categories, total] = await qb.getManyAndCount();

        return {
            categories,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        };
    }

    async getById(
        categoryId: number,
        userId: number
    ) {

        const queryBuilder = categoryRepository.createQueryBuilder("category")
            .select([
                "category.id as id",
                "category.categoryId as categoryId",
                "category.name as name",
                "category.status as status",
                "category.createdAt as createdAt",
                "category.updatedAt as updatedAt",
            ])
            .where("category.categoryId = :categoryId AND category.userId = :userId", { categoryId, userId })
            .andWhere("category.status != :status", { status: CategoryStatus.DELETE });

        const result = await queryBuilder.getRawOne();

        if (!result) {
            throw {
                statusCode: 404,
                message: "Category not found"
            };
        }

        return result;
    };

    async update(
        categoryId: number,
        userId: number,
        data: any
    ) {

        const { name } = data;

        // Check category exists
        const category = await categoryRepository.findOne({
            where: {
                categoryId,
                userId,
                status: Not(CategoryStatus.DELETE)
            }
        });

        if (!category) {
            throw {
                statusCode: 404,
                message: "Category not found"
            };
        }

        // Check duplicate category
        const duplicate = await categoryRepository
            .createQueryBuilder("category")
            .where("LOWER(category.name) = LOWER(:name)", { name })
            .andWhere("category.userId = :userId", { userId })
            .andWhere("category.categoryId != :categoryId", { categoryId })
            .andWhere("category.status != :status", { status: CategoryStatus.DELETE })
            .getOne();

        if (duplicate) {
            throw {
                statusCode: 400,
                message: "Category name already exists"
            };
        }

        category.name = name;

        await categoryRepository.save(category);

        return category;
    };

    async delete(
        categoryId: number,
        userId: number
    ) {

        // Check category exists
        const category = await categoryRepository.findOne({
            where: {
                categoryId,
                userId,
                status: Not(CategoryStatus.DELETE)
            }
        });

        if (!category) {
            throw {
                statusCode: 404,
                message: "Category not found"
            };
        }

        // Check if category is used in any expense
        const expense = await expenseRepository.findOne({
            where: {
                category: {
                    categoryId
                }
            }
        });

        if (expense) {
            throw {
                statusCode: 400,
                message: "Category cannot be deleted because it is associated with expenses."
            };
        }

        category.status = CategoryStatus.DELETE;

        await categoryRepository.save(category);

        return;
    };
}

export default new CategoryService();
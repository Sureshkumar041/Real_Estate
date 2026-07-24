import { AppDataSource } from "../config/data-source";
import { Category } from "../entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);

class CategoryService {

    async create(name: string, user: any) {

        // Check for duplicate category
        const existingCategory = await categoryRepository.findOne({
            where: {
                name,
                user: { id: user.id }
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
}

export default new CategoryService();
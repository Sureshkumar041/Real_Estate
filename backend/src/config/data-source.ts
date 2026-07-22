import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Expense } from "../entities/Expense";
import { Category } from "../entities/Category";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: true,
    logging: false, // Set true if need DB logs
    entities: [User, Expense, Category],
    migrations: [],
});
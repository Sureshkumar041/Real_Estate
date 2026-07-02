import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Generated,
    OneToMany,
} from "typeorm";
import { Expense } from "./Expense";
import { Category } from "./Category";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'integer', unique: true })
    @Generated('increment')
    userId!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: "active" })
    status!: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @OneToMany(() => Category, (category) => category.user)
    categories!: Category[];

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses!: Expense[]
}
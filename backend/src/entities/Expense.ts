import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    Generated,
    JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'integer', unique: true })
    @Generated('increment')
    expenseId!: number;

    @Column({ length: 150 })
    title!: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
    })
    amount!: number;

    @Column({ type: "date" })
    expenseDate!: string;

    @Column({ type: 'integer' })
    userId!: number;

    @Column({ type: 'integer' })
    categoryId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.expenses, {
        onDelete: "CASCADE",
    })
    @JoinColumn({
        name: "userId",
        referencedColumnName: "userId",
    })
    user!: User;

    @ManyToOne(() => Category, (category) => category.expenses)
    @JoinColumn({
        name: "categoryId",
        referencedColumnName: "categoryId",
    })
    category!: Category;
}
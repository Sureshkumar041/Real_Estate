import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    Generated,
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

    @Column()
    title!: string;

    @Column("decimal")
    amount!: number;

    @Column({ type: "date" })
    date!: string;

    @Column({ type: "date" })
    expenseDate!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.expenses, {
        onDelete: "CASCADE",
    })
    user!: User;

    @ManyToOne(() => Category, (category) => category.expenses)
    category!: Category;
}
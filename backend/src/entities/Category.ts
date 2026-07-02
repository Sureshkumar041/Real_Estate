import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { User } from "./User";
import { Expense } from "./Expense";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: "active" })
    status!: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: "CASCADE",
    })
    user!: User;

    @OneToMany(() => Expense, (expense) => expense.category)
    expenses!: Expense[];
}
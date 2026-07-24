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
import { Status } from "../constants/enums";

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

    @Column({ select: false })
    password!: string;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.ACTIVE,
    })
    status!: Status;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @CreateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;

    @OneToMany(() => Category, (category) => category.user)
    categories!: Category[];

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses!: Expense[]
}
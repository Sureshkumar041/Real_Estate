import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Generated,
} from "typeorm";
import { User } from "./User";
import { Expense } from "./Expense";
import { CategoryStatus } from "../constants/enums";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'integer', unique: true })
    @Generated('increment')
    categoryId!: number;

    @Column()
    name!: string;

    @Column({ type: 'integer' })
    userId!: number;

    @Column({
        type: "enum",
        enum: CategoryStatus,
        default: CategoryStatus.ACTIVE,
    })
    status!: CategoryStatus;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @CreateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: "CASCADE",
    })
    @JoinColumn({
        name: "userId",
        referencedColumnName: "userId",
    })
    user!: User;

    @OneToMany(() => Expense, (expense) => expense.category)
    expenses!: Expense[];
}
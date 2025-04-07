import {
    Table, Column, DataType, Model, ForeignKey, BelongsTo
} from "sequelize-typescript";
import { User } from "../index";

@Table({ tableName: "pharmacy_profiles", timestamps: true })
export class PharmacyProfile extends Model<PharmacyProfile> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique: true })
    user_id!: number;

    @Column({ type: DataType.STRING })
    license_number!: string;

    @Column({ type: DataType.INTEGER })
    verified_by!: number;

    @Column({ type: DataType.TEXT })
    opening_hours!: string;
}

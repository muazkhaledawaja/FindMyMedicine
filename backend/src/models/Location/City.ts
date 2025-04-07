import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Region } from "./Region";

@Table({
    tableName: "cities",
    timestamps: true,
})
export class City extends Model<City> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    latitude!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    longitude!: number;

    @HasMany(() => Region)
    regions!: Region[];
}

import { Table, Column, DataType, Model } from "sequelize-typescript";
import { defaultTableSettings } from "../../config/DefaultTableSettings";
import {
    GenderValues,
    UserRolesValues,
    UserStatusValues,
} from "../../enums/enums";


@Table({
    tableName: "users",
    ...defaultTableSettings
})
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: "unique_email",

        validate: {
            isEmail: true,
        },
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: "unique_phone_number",
    })
    phone_number!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profile_picture_url!: string;

    @Column({
        type: DataType.ENUM(...UserRolesValues),
        allowNull: false,
        defaultValue: "customer",
    })
    role!: string;

    @Column({
        type: DataType.ENUM(...GenderValues),
        allowNull: false,
        defaultValue: "not_specified",
    })
    gender!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address!: string;


    @Column({
        type: DataType.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
    })
    rating!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    })
    is_active!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_verified!: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    created_by!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    modified_by!: number;

    @Column({
        type: DataType.ENUM(...UserStatusValues),
        allowNull: false,
        defaultValue: "active",
    })
    status!: string;

}

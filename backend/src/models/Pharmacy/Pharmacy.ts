import {
    Table, Column, DataType, Model, ForeignKey, BelongsTo
  } from "sequelize-typescript";
  import { User,City , Region } from "../index";
  
  @Table({ tableName: "pharmacies", timestamps: true })
  export class Pharmacy extends Model<Pharmacy> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    manager_id!: number;
  
    @ForeignKey(() => City)
    @Column({ type: DataType.INTEGER, allowNull: false })
    city_id!: number;
  
    @ForeignKey(() => Region)
    @Column({ type: DataType.INTEGER, allowNull: false })
    region_id!: number;
  
    @Column({ type: DataType.STRING })
    address!: string;
  
    @Column({ type: DataType.STRING })
    phone!: string;
  
    @Column({ type: DataType.STRING })
    mobile!: string;
  
    @Column({ type: DataType.STRING })
    image!: string;
  }
  
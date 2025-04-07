import {
    Table, Column, DataType, Model, ForeignKey
  } from "sequelize-typescript";
  import { User } from "../index";
  
  @Table({ tableName: "delivery_profiles", timestamps: true })
  export class DeliveryProfile extends Model<DeliveryProfile> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique: true })
    user_id!: number;
  
    @Column({ type: DataType.STRING })
    vehicle_type!: string;
  
    @Column({ type: DataType.TEXT })
    delivery_area!: string;
  
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    is_available!: boolean;
  }
  
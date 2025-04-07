import {
    Table, Column, DataType, Model, ForeignKey
  } from "sequelize-typescript";
  import { Category } from "./Category";
  
  @Table({ tableName: "medicines", timestamps: true })
  export class Medicine extends Model<Medicine> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;
  
    @Column({ type: DataType.TEXT })
    combination!: string;
  
    @Column({ type: DataType.STRING })
    dosage!: string;
  
    @Column({ type: DataType.TEXT })
    instructions!: string;
  
    @Column({ type: DataType.TEXT })
    side_effects!: string;
  
    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    category_id!: number;
  
    @Column(DataType.DECIMAL(10, 2))
    price!: number;
  
    @Column(DataType.DATE)
    expire_date!: Date;
  
    @Column(DataType.STRING)
    image!: string;
  }
  
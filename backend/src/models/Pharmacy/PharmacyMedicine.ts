import {
    Table, Column, Model, DataType, ForeignKey
  } from "sequelize-typescript";
  import { Medicine ,Pharmacy } from "../index";
  
  @Table({ tableName: "pharmacy_medicines", timestamps: true })
  export class PharmacyMedicine extends Model<PharmacyMedicine> {
    @ForeignKey(() => Pharmacy)
    @Column({ type: DataType.INTEGER, primaryKey: true })
    pharmacy_id!: number;
  
    @ForeignKey(() => Medicine)
    @Column({ type: DataType.INTEGER, primaryKey: true })
    medicine_id!: number;
  
    @Column({ type: DataType.INTEGER })
    stock_quantity!: number;
  
    @Column({ type: DataType.INTEGER })
    reorder_threshold!: number;
  
    @Column({ type: DataType.DATE })
    last_restocked!: Date;
  
    @Column(DataType.STRING)
    batch_number!: string;
  
    @Column(DataType.DATE)
    manufacturing_date!: Date;
  }
  
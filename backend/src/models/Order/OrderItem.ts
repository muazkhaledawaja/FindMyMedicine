import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Order, Medicine } from "../index";

@Table({ tableName: "order_items", timestamps: true })
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  order_id!: number;

  @ForeignKey(() => Medicine)
  @Column(DataType.INTEGER)
  medicine_id!: number;

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.DECIMAL(10, 2))
  price_at_order_time!: number;

  @Column(DataType.DECIMAL(10, 2))
  discount!: number;

  @Column(DataType.DECIMAL(10, 2))
  total_price!: number;
}

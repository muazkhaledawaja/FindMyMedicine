import { Table, Column, DataType, Model, ForeignKey } from "sequelize-typescript";
import { Pharmacy , User } from "../index";

@Table({ tableName: "orders", timestamps: true })
export class Order extends Model<Order> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => Pharmacy)
  @Column(DataType.INTEGER)
  pharmacy_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  delivery_id!: number;

  @Column({
    type: DataType.ENUM("pending", "approved", "rejected", "shipped", "delivered", "canceled"),
    defaultValue: "pending",
  })
  status!: string;

  @Column(DataType.DATE)
  order_date!: Date;
}

import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "../index";

@Table({ tableName: "activity_logs", timestamps: true })
export class ActivityLog extends Model<ActivityLog> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column(DataType.STRING)
  action!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.STRING)
  ip_address!: string;

  @Column(DataType.DATE)
  created_at!: Date;
}

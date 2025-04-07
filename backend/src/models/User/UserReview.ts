import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "../index";

@Table({ tableName: "user_reviews", timestamps: true })
export class UserReview extends Model<UserReview> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  reviewer_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  reviewed_user_id!: number;

  @Column(DataType.INTEGER)
  rating!: number;

  @Column(DataType.TEXT)
  comment!: string;

  @Column(DataType.DATE)
  created_at!: Date;
}

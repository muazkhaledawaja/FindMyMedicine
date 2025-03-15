import { Table, Column, DataType, Model } from "sequelize-typescript";
import { defaultTableSettings } from "../../config/DefaultTableSettings";

@Table({
  tableName: "user_passwords",
  ...defaultTableSettings,
})
export class UserPassword extends Model<UserPassword> {
  @Column({ type: DataType.INTEGER, allowNull: false,
    unique: "unique_user_id", })
  user_id!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  password_hash!: string;
}

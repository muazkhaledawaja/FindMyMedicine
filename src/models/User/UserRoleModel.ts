import { Table, Column, DataType, Model } from "sequelize-typescript";
import { defaultTableSettings } from "../../config/DefaultTableSettings";

@Table({ ...defaultTableSettings, tableName: "user_roles" })
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id!: number;
}

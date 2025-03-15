import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "roles",
  timestamps: true,
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role_name!: string;
}

import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({ tableName: "categories", timestamps: true })
export class Category extends Model<Category> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, unique: true })
  name!: string;
}

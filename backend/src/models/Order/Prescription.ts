import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Medicine ,User} from "../index";

@Table({ tableName: "prescriptions", timestamps: true })
export class Prescription extends Model<Prescription> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  doctor_id!: number;

  @ForeignKey(() => Medicine)
  @Column(DataType.INTEGER)
  medicine_id!: number;

  @Column(DataType.DATE)
  valid_until!: Date;

  @Column(DataType.TEXT)
  instructions!: string;

  @Column(DataType.STRING)
  uploaded_file_url!: string;
}

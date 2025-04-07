import {
    Table,
    Column,
    DataType,
    Model,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { City } from "./City";
  
  @Table({
    tableName: "regions",
    timestamps: true,
  })
  export class Region extends Model<Region> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    postal_code!: string;
  
    @ForeignKey(() => City)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    city_id!: number;
  
    @BelongsTo(() => City)
    city!: City;
  }
  
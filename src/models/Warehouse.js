import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export const Warehouse = sequelize.define(
  "Warehouse",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  },
);

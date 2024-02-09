import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export const Role = sequelize.define(
  "Role",
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
    level: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  },
);

import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export const Movement = sequelize.define(
  "Movement",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
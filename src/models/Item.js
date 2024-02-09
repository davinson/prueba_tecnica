import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouse:{
      type: DataTypes.INTEGER,
    },
    product: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

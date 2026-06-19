const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER,
    updated_by: DataTypes.DATE,

  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = User;
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id:DataTypes.INTEGER,
    house_number: DataTypes.STRING,
    district: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    },
  {
    sequelize,
    modelName: "Address",
    tableName: "Addes_patient",
    timestamps: false,
  }
);

module.exports = Address;
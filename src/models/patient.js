const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Patient = sequelize.define(
    "Patient",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id:DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        gender: DataTypes.STRING,
        phone: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: "patient",
        tableName: "patient",
        timestamps: false,
    }
);

module.exports = Patient;
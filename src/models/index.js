const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import models
db.User = require("./user");
db.patient = require("./patient");
db.address = require("./address");

//associations
db.patient.hasMany(db.address, { foreignKey: "patient_id" , as: "address" });

db.address.belongsTo(db.patient, { foreignKey: "patient_id" , as: "patient" });


module.exports = db;
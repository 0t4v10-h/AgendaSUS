import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Doctor from "./doctor.model.js";
import Appointment from "./appointment.model.js";

User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

export { sequelize, User, Doctor, Appointment };
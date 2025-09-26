import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Doctor from "./doctor.model.js";

const Appointment = sequelize.define("Appointment", {
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoConsulta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubs: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "agendado"
    }
});

User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

export default Appointment;
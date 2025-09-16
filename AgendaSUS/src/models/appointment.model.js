import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Appointment = sequelize.define("Appointment", {
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doctorName: {
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

export default Appointment;
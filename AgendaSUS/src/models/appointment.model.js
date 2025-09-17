import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Appointment = sequelize.define("Appointment", {
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
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Doctor = sequelize.define("Doctor", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Doctor;
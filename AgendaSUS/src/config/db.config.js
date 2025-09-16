import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/db/agendasus.sqlite"
});

export default sequelize;
import express from "express";
import sequelize from "./config/db.config.js";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();
app.use(express.json());

// Rotas
app.use("/appointments", appointmentRoutes);

// Conecta ao banco e inicia o servidor
sequelize.sync().then(() => {
    console.log("Banco de Dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
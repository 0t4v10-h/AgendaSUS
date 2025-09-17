import express from "express";
import { sequelize } from "./models/index.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";

const app = express();
app.use(express.json());

// Rotas
app.use("/appointments", appointmentRoutes);
app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);

// Conecta ao banco e inicia o servidor
sequelize.sync(/*{ force: true }*/).then(() => {
    console.log("Banco recriado e sincronizado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
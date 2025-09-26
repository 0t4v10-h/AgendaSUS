import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/user.service.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
export async function register(req, res) {
    try {
        const created = await registerUser(req.body);

        const user = created.toJSON ? created.toJSON() : created;

        if (user.password) delete user.password;

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({ token, user });
    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(400).json({ message: error.message || "Erro ao registrar usuario" });
    }
}

export async function login(req, res) {
    try {
        const result = await loginUser(req.body);
        if (!result) {
            return res.status(401).json({ message: "Credenciais inválidas " });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
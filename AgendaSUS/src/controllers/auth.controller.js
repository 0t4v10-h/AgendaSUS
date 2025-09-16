import { registerUser, loginUser } from "../services/user.service.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "Usuário registrado com sucesso", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
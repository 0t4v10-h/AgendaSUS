import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function registerUser({ name, email, password, cpf, role }) {

    if (!name || !email || !password || !cpf) {
        throw new Error("Name, email, senha e CPF são obrigatórios");
    }

    if (!cpfValidator.isValid(cpf)) {
        throw new Error("CPF inválido");
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
        throw new Error("Email já cadastrado");
    }

    const existingCpf = await User.findOne({ where: { cpf } });
    if (existingCpf) {
        throw new Error("CPF já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        cpf,
        role: role || "patient"
    });

    const userSafe = newUser.toJSON();
    delete userSafe.password;

    return userSafe;
}

export async function loginUser({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token, user };
}
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function registerUser({ name, email, password, cpf, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
        name,
        email,
        password: hashedPassword,
        cpf,
        role: role || "patient"
    });
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
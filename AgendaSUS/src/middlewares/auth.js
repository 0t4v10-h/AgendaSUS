import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(403).json({ message: "Token não fornecido" });

    const token = authHeader.split(" ")[1];

    try {
        const decored = jwt.verify(token, JWT_SECRET);
        req.user = decored;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
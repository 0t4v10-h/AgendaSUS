import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        loadToken();
    }, []);

    async function loadToken() {
        try {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Erro ao carregar o token:", error);
        }
    }

    async function Login(tokenValue) {
        setToken(tokenValue);
        await AsyncStorage.setItem("token", tokenValue);
    }

    async function logout() {
        setToken(null);
        await AsyncStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ token, Login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
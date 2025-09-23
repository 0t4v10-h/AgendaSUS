import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert
} from "react-native";
import api from "../services/api";
import { saveToken } from "../services/authStorage";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const res = await api.post("/auth/login", { email, password });

            await saveToken(res.data.token);

            Alert.alert("Login realizado!", `Bem-Vindo ${res.data.user.name}`);
            navigation.replace("Home");
        } catch (error) {
            Alert.alert("Erro", error.response?.data?.message || "Falha no login");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agenda SUS</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Registrar" onPress={() => navigation.navigate("Register")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5
    }
});
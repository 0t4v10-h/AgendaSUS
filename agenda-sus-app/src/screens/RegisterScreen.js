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

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");

    async function handleRegister() {
        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
                cpf
            });

            const token = res.data.token;
            await saveToken(token);

            Alert.alert("Cadastro realizado!", `Bem-vindo ${res.data.user.name}`);
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Erro", error.response?.data?.message || "Falha no cadastro");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />

            <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />

            <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" value={cpf} onChangeText={setCpf} />

            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

            <Button title="Cadastrar" onPress={handleRegister} />
            <Button title="Voltar" onPress={() => navigation.navigate("Login")} />
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
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40
    }
});

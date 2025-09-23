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

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");

    async function handleRegister() {
        try {
            await api.post("/auth/register", { name, email, password, cpf });
            Alert.açert("Cadastro realizado!", "Usuário registrado com sucesso!");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Erro", error.response?.data?.message || "Falha no registro");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>
            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
            <Button title="Cadastrar" onPress={handleRegister} />
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

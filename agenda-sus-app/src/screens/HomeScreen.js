import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from "react-native";
import { removeToken } from "../services/authStorage";

export default function HomeScreen({ navigation }) {

    async function handleLogout() {
        await removeToken();
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Agenda SUS!</Text>
            <Button title="Minhas Consultas" onPress={() => { }} />
            <Button title="Médicos" onPress={() => { }} />
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    }
});
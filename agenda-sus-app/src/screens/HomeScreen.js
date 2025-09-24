import React, { useContext } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { removeToken } from "../services/authStorage";

export default function HomeScreen({ navigation }) {
    const { token } = useContext(AuthContext);

    async function handleLogout() {
        await removeToken();
        navigation.replace("Login");
    }

    function handleNavigate(screen) {
        if (token) {
            navigation.navigate(screen);
        } else {
            navigation.navigate("Login");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Agenda SUS!</Text>

            <Button title="Agendar Consultas" onPress={() => handleNavigate("AgendarConsulta")} />

            <Button title="Meus Agendamentos" onPress={() => handleNavigate("Agendamentos")} />

            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    }
});
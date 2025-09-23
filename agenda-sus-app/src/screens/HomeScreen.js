import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet
} from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Agenda SUS!</Text>
            <Button title="Minhas Consultas" onPress={() => { }} />
            <Button title="Médicos" onPress={() => { }} />
            <Button title="Sair" onPress={() => { navigation.replace("Login"); }} />
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
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert, Button, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import { TextInput } from "react-native";
import { getToken } from "../services/authStorage";

export default function AgendarConsultaScreen({ navigation }) {
    const [tipoConsulta, setTipoConsulta] = useState("Consulta Geral");
    const [ubs, setUbs] = useState("");
    const [date, setDate] = useState(null);

    async function handleAgendar() {
        try {
            const token = await getToken();
            const res = await api.post("/appointments", {
                tipoConsulta,
                ubs,
                date,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            Alert.alert(
                "Consulta agendada!",
                `Consulta em ${ubs} (${tipoConsulta}) com Dr. ${res.data.doctor} no dia ${date}`
            );
        } catch (error) {
            console.error("Erro ao agendar consulta:", error.response ?? error.message ?? error);
            Alert.alert("Erro", error.response?.data?.message || "Falha ao agendar consulta");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agendar Consulta</Text>

            <Text style={styles.label}>Tipo de Consulta</Text>
            <Picker
                selectedValue={tipoConsulta}
                onValueChange={(setTipoConsulta)}
            >
                <Picker.Item label="Consulta Geral" value="Consulta Geral" />
                <Picker.Item label="Pediatria" value="Pediatria" />
                <Picker.Item label="Cardiologia" value="Cardiologia" />
            </Picker>

            <Text style={styles.label}>UBS</Text>
            <Picker
                selectedValue={ubs}
                onValueChange={setUbs}
            >
                <Picker.Item label="UBS Central" value="central" />
                <Picker.Item label="UBS Jardim" value="jardim" />
                <Picker.Item label="UBS Esperança" value="esperanca" />
            </Picker>

            <Text style={styles.label}>Data e Hora</Text>
            <TextInput
                style={styles.input}
                placeholder="2025-09-30"
                value={date}
                onChangeText={setDate}
            />

            <Button title="Confirmar Agendamento" onPress={handleAgendar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
});
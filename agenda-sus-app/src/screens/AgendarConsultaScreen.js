import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert, Button, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import { TextInput } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function AgendarConsultaScreen({ navigation }) {
    const { token } = useContext(AuthContext);
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorsId] = useState(null);
    const [type, setType] = useState("Consulta Geral");
    const [ubs, setUbs] = useState("UBS Central");
    const [date, setDate] = useState("2025-10-01T09:00:00");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            navigation.navigate("Login", { redirectTo: "AgendarConsulta" });
            return;
        }

        async function fetchDoctors() {
            setLoading(true);
            try {
                const res = await api.get("/doctors", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(res.data);
            } catch (err) {
                console.error("Erro ao buscar médicos:", err.response ?? err.message ?? err);
                Alert.alert("Erro", "Não foi possível carregar médicos");
            } finally {
                setLoading(false);
            }
        }

        fetchDoctors();
    }, [token, navigation]);

    async function handleAgendar() {
        if (!doctorId) {
            Alert.alert("Atenção", "Escolha um médico antes de confirmar.");
            return;
        }
        if (!date) {
            Alert.alert("Atenção", "Escolha uma data e hora antes de confirmar.");
            return;
        }

        try {
            await api.post(
                "/appointments",
                {
                    doctorId,
                    date,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            Alert.alert("Sucesso", "Consulta agendada!");
            navigation.replace("MeusAgendamentos");
        } catch (error) {
            console.error("Erro ao agendar consulta:", error.response ?? error.message ?? error);
            Alert.alert("Erro", error.response?.data?.message || "Falha ao agendar consulta");
        }
    }

    if (!token) {
        return null;
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agendar Consulta</Text>

            <Text>Tipo de Consulta</Text>
            <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
            >
                <Picker.Item label="Consulta Geral" value="Consulta Geral" />
                <Picker.Item label="Pediatria" value="Pediatria" />
                <Picker.Item label="Cardiologia" value="Cardiologia" />
            </Picker>

            <Text>UBS</Text>
            <Picker
                selectedValue={ubs}
                onValueChange={(itemValue) => setUbs(itemValue)}
            >
                <Picker.Item label="UBS Central" value="UBS Central" />
                <Picker.Item label="UBS Norte" value="UBS Norte" />
                <Picker.Item label="UBS Sul" value="UBS Sul" />
            </Picker>

            <Text>Medico</Text>
            <Picker
                selectedValue={doctorId}
                onValueChange={(itemValue) => setDoctorsId(itemValue)}
            >
                <Picker.Item label="Selecione um médico..." value={null} />
                {doctors.map((doctor) => (
                    <Picker.Item
                        key={doctor.id}
                        label={`${doctor.name} - ${doctor.specialty}`}
                        value={doctor.id}
                    />
                ))}
            </Picker>

            <Text style={{ marginTop: 10 }}>Data e Hora</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginVertical: 10, borderRadius: 6 }}
                placeholder="YYYY-MM-DDTHH:MM:SS"
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
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
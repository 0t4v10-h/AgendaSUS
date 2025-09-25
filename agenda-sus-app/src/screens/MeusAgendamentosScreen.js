import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function MeusAgendamentosScreen({ navigation }) {
    const { token } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigation.navigate("Login", { redirectTo: "MeusAgendamentos" });
            return;
        }

        async function fetchAppointments() {
            try {
                const res = await api.get("/appointments/my", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(res.data);
            } catch (err) {
                console.error("Erro ao carregar agendamentos:", err.response ?? err.message ?? err);
                Alert.alert("Erro", "Nao foi possivel carregar as consultas");
            } finally {
                setLoading(false);
            }
        }
        fetchAppointments();
    }, [token, navigation]);

    if (!token) return null;

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" />
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Agendamentos</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.date}>
                            {new Date(item.date).toLocaleString("pt-BR")}
                        </Text>
                        <Text>Médico: {item.Doctor?.name ?? item.doctorName ?? "-"}</Text>
                        <Text>Local: {item.ubs ?? "UBS Central"}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Você não tem agendamentos.</Text>}
            />
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
    card: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    date: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
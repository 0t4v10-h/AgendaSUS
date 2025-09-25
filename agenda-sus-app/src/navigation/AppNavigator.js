import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AgendarConsultaScreen from "../screens/AgendarConsultaScreen";
import MeusAgendamentosScreen from "../screens/MeusAgendamentosScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">

            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgendarConsulta" component={AgendarConsultaScreen} options={{ title: "Agendar Consulta" }} />
            <Stack.Screen name="Agendamentos" component={MeusAgendamentosScreen} options={{ title: "Meus Agendamentos" }} />

        </Stack.Navigator>
    );
}
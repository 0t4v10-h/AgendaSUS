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
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="AgendarConsulta" component={AgendarConsultaScreen} />
            <Stack.Screen name="Agendamentos" component={MeusAgendamentosScreen} />
        </Stack.Navigator>
    );
}
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";

export async function saveToken(token) {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error("Erro ao salvar o token:", error);
    }
}

export async function getToken() {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error("Erro ao obter o token:", error);
        return null;
    }
}

export async function removeToken() {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error("Erro ao remover o token:", error);
    }
}
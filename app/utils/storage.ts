// utils/storage.ts
import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "access_token";

export const saveToken = async (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token);
export const getToken = async () => SecureStore.getItemAsync(TOKEN_KEY);
export const removeToken = async () => SecureStore.deleteItemAsync(TOKEN_KEY);

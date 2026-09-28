import { clearToken, getToken } from "../user-management/tokenStorage";
import { ENDPOINTS } from "./endpoints";

const API_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export async function apiClient(endpoint, options = {}) {
    const token = getToken();
    let response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                // ngrok free tier returns an HTML warning page for browser GETs without this
                "ngrok-skip-browser-warning": "true",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
        });
    } catch (error) {
        throw new Error("Unable to connect to the server.", { cause: error });
    }

    // Expired / invalid token: drop it so it is not reused (login 401 = wrong password)
    if (response.status === 401 && endpoint !== ENDPOINTS.USER_MANAGEMENT.AUTH) {
        clearToken();
    }

    // e.g. DELETE returns 204 with no body
    if (response.status === 204) {
        return null;
    }

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error("Invalid response from the server.");
    }

    if (!response.ok) {
        const message = Array.isArray(data.detail)
            ? data.detail[0]?.msg
            : data.detail;

        throw new Error(message || "Something went wrong.");
    }

    return data;
}

import { clearToken, getToken, setToken } from "../user-management/tokenStorage";
import { ENDPOINTS } from "./endpoints";

const API_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

const NO_REFRESH_ENDPOINTS = [
    ENDPOINTS.USER_MANAGEMENT.AUTH,
    ENDPOINTS.USER_MANAGEMENT.REFRESH,
    ENDPOINTS.USER_MANAGEMENT.LOGOUT,
];

// Uses the httpOnly refresh cookie to get a new access token
async function refreshAccessToken() {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.USER_MANAGEMENT.REFRESH}`, {
            method: "POST",
            credentials: "include",
            headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!response.ok) return false;

        const data = await response.json();
        setToken(data.access_token);
        return true;
    } catch {
        return false;
    }
}

export async function apiClient(endpoint, options = {}, retry = true) {
    const token = getToken();
    let response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            credentials: "include",
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

    // Expired / invalid access token: try a refresh once, then retry the request
    if (response.status === 401 && !NO_REFRESH_ENDPOINTS.includes(endpoint)) {
        if (retry && (await refreshAccessToken())) {
            return apiClient(endpoint, options, false);
        }
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

import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { clearToken, setToken } from "./tokenStorage";

export async function authenticateUser(email, password) {
    const result = await apiClient(ENDPOINTS.USER_MANAGEMENT.AUTH, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    setToken(result.access_token);
    return result;
}

export async function getCurrentUser() {
    return apiClient(ENDPOINTS.USER_MANAGEMENT.ME);
}

export async function logout() {
    try {
        await apiClient(ENDPOINTS.USER_MANAGEMENT.LOGOUT, { method: "POST" });
    } finally {
        clearToken();
    }
}

// Admin-only; the admin is identified by the token, no body needed
export async function deleteUser(userId) {
    return apiClient(ENDPOINTS.USER_MANAGEMENT.USER_BY_ID(userId), {
        method: "DELETE",
    });
}

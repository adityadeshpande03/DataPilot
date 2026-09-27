import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export async function authenticateUser(email, password) {
    return apiClient(ENDPOINTS.USER_MANAGEMENT.AUTH, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });
}
const API_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export async function apiClient(endpoint, options = {}) {
    let response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
    } catch (error) {
        throw new Error("Unable to connect to the server.", { cause: error });
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
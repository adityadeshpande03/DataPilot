const TOKEN_KEY = "datapilot_token";

// Fallback when localStorage is blocked (e.g. private mode)
let memoryToken = null;

export function getToken() {
    try {
        return localStorage.getItem(TOKEN_KEY) ?? memoryToken;
    } catch {
        return memoryToken;
    }
}

export function setToken(token) {
    memoryToken = token;
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch {
        // Storage unavailable
    }
}

export function clearToken() {
    memoryToken = null;
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch {
        // Nothing to clear
    }
}

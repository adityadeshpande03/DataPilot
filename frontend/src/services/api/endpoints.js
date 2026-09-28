export const ENDPOINTS = {
    USER_MANAGEMENT:{
        AUTH: '/api/users/auth',
        REFRESH: '/api/users/refresh',
        LOGOUT: '/api/users/logout',
        ME: '/api/users/me',
        USER_BY_ID: (id) => `/api/users/${id}`,
    }
}

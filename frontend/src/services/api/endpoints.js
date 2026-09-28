export const ENDPOINTS = {
    USER_MANAGEMENT:{
        AUTH: '/api/users/auth',
        ME: '/api/users/me',
        USER_BY_ID: (id) => `/api/users/${id}`,
    }
}

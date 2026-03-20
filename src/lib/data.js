// ─── Token helpers ───────────────────────────────────────────────────────────
const TOKEN_KEY = 'uthsav_admin_token';

// Use sessionStorage for session-based auth (clears on tab close)
// Switch to localStorage only if "Remember Me" is implemented
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

// ─── Fetch helpers ───────────────────────────────────────────────────────────
// Ensure the base URL is stable even if env var includes a trailing slash
// During production on uthsavinvites.in, this seamlessly targets the Render backend
const ENV_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://ui-backend-kbxo.onrender.com' : '');
const API_BASE = ENV_URL.replace(/\/+$/, '');
const BASE = `${API_BASE}/api`;

const handleErr = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // If 401, clear stored token
        if (res.status === 401) removeToken();
        throw new Error(body.error || `HTTP ${res.status}`);
    }
    return res.json();
};

// Authenticated fetch (includes JWT bearer token)
const authFetch = (url, options = {}) => {
    const token = getToken();
    if (!token) return Promise.reject(new Error('Not authenticated'));

    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    }).then(handleErr);
};

// Public fetch (no auth header)
const publicFetch = (url, options = {}) =>
    fetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    }).then(handleErr);

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const login = async (email, password) => {
    const data = await publicFetch(`${BASE}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
};

export const logout = () => removeToken();

export const getMe = () => authFetch(`${BASE}/auth/me`);

export const changePassword = (currentPassword, newPassword) =>
    authFetch(`${BASE}/auth/change-password`, {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
    });

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const getTestimonials = () =>
    publicFetch(`${BASE}/testimonials`);

export const createTestimonial = (data) =>
    authFetch(`${BASE}/testimonials`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const updateTestimonial = (id, data) =>
    authFetch(`${BASE}/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

export const deleteTestimonial = (id) =>
    authFetch(`${BASE}/testimonials/${id}`, { method: 'DELETE' });

export const resetTestimonials = () =>
    authFetch(`${BASE}/testimonials/reset`, { method: 'POST' });

// ─── Contact Messages ─────────────────────────────────────────────────────────

export const getContactMessages = () =>
    authFetch(`${BASE}/messages`);

export const createContactMessage = (data) =>
    publicFetch(`${BASE}/messages`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const deleteContactMessage = (id) =>
    authFetch(`${BASE}/messages/${id}`, { method: 'DELETE' });

export const markMessageRead = (id) =>
    authFetch(`${BASE}/messages/${id}/read`, { method: 'PATCH' });

export const clearAllMessages = () =>
    authFetch(`${BASE}/messages`, { method: 'DELETE' });

// ─── Showcases ──────────────────────────────────────────────────────────────

export const getShowcases = () =>
    authFetch(`${BASE}/showcases`);

export const getShowcasesByCategory = (category) => {
    if (!category) return Promise.reject(new Error('Category required'));
    return publicFetch(`${BASE}/showcases/${category}`);
};

export const createShowcase = (data) =>
    authFetch(`${BASE}/showcases`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const updateShowcase = (id, data) =>
    authFetch(`${BASE}/showcases/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

export const deleteShowcase = (id) =>
    authFetch(`${BASE}/showcases/${id}`, { method: 'DELETE' });

// ─── Categories ──────────────────────────────────────────────────────────────

export const getCategories = () =>
    publicFetch(`${BASE}/categories`);

export const getCategoryBySlug = (slug) =>
    publicFetch(`${BASE}/categories/${slug}`);

export const createCategory = (data) =>
    authFetch(`${BASE}/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const updateCategory = (id, data) =>
    authFetch(`${BASE}/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

export const deleteCategory = (id) =>
    authFetch(`${BASE}/categories/${id}`, { method: 'DELETE' });

export const seedCategories = () =>
    authFetch(`${BASE}/categories/seed`, { method: 'POST' });

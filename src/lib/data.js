// ─── Token helpers ───────────────────────────────────────────────────────────
const TOKEN_KEY = 'uthsav_admin_token';

// Use sessionStorage for session-based auth (clears on tab close)
// Switch to localStorage only if "Remember Me" is implemented
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

// ─── Fetch helpers ───────────────────────────────────────────────────────────
// 🔒 FIX: Removed hardcoded fallback URL — set VITE_API_URL in Vercel env vars instead.
// Hardcoding a production URL in source means migrating the backend requires a code change + redeploy.
const ENV_URL = import.meta.env.VITE_API_URL || '';
if (import.meta.env.PROD && !ENV_URL) {
    console.error('❌ VITE_API_URL is not set. All API calls will fail in production. Set it in your Vercel dashboard.');
}
const API_BASE = ENV_URL.replace(/\/+$/, '');
const BASE = `${API_BASE}/api`;

// Shared error parser — does NOT clear token (that's only authFetch's job)
const handleErr = async (res) => {
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // 🔒 FIX: Don't clear token here — publicFetch also uses handleErr, so a
        // 401 on the public contact form would silently log the admin out.
        throw new Error(body.error || `HTTP ${res.status}`);
    }
    return res.json();
};

// Authenticated fetch (includes JWT bearer token)
// 🔒 FIX: Token clear on 401 lives HERE only — not in the shared handleErr
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
    }).then(async (res) => {
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            // Only clear the token when the auth'd endpoint explicitly rejects us
            if (res.status === 401) removeToken();
            throw new Error(body.error || `HTTP ${res.status}`);
        }
        return res.json();
    });
};

// ─── Image Upload (multipart — no JSON Content-Type) ─────────────────────────
// Uploads a File object to /api/uploads/image (Cloudinary-backed).
// Returns { url, publicId } on success.
export const uploadImage = async (file) => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${BASE}/uploads/image`, {
        method: 'POST',
        // ⚠️ Do NOT set Content-Type — the browser must set it with the multipart boundary
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 401) removeToken();
        throw new Error(body.error || `Upload failed: HTTP ${res.status}`);
    }
    return res.json(); // { url: 'https://res.cloudinary.com/...', publicId: '...' }
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

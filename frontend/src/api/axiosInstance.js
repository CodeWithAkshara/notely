import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

let csrfToken = null;

export async function fetchCsrfToken() {
  if (csrfToken) return csrfToken;
  try {
    const res = await api.get("/csrf-token");
    csrfToken = res.data.csrfToken;
    return csrfToken;
  } catch (err) {
    console.error("Failed fetching CSRF token", err);
    throw err;
  }
}

api.interceptors.request.use(async (config) => {
  const method = (config.method || "").toLowerCase();
  if (["post", "put", "delete", "patch"].includes(method)) {
    try {
      const token = await fetchCsrfToken();
      config.headers["X-CSRF-Token"] = token;
    } catch (err) {}
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const currentPath = window.location.pathname;

    if (
      err?.response?.status === 401 &&
      currentPath !== "/login" &&
      currentPath !== "/register"
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(err);
  },
);
export default api;

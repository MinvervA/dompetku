import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //   baseURL: "http://localhost:8080/api",
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const skipRedirectURL = ["/auth/login", "/auth/register"];
    const shouldSkip = skipRedirectURL.some((url) =>
      error.config.url.includes(url),
    );

    if (error.response?.status === 401 && !shouldSkip) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

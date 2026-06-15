import { useEffect } from "react";
import { fetchCsrfToken } from "../api/axiosInstance";

export default function useCsrf() {
  useEffect(() => {
    fetchCsrfToken().catch((err) => {});
  }, []);
}

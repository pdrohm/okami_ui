import axios from "axios";

const baseURL =
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_LOCAL_API_URL;

const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(baseURL);

export default httpClient;

import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(baseURL);

export default httpClient;

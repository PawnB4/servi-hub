import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const client = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true
});

export default client;

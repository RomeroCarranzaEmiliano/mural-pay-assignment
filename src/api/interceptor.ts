"use server"
import axios from "axios";

class InterceptorError extends Error {
  constructor(message: string = "Unknown error.") {
    super(message);
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) throw new InterceptorError("BASE_URL not defined in environment.");

const API_KEY = process.env.NEXT_PUBLIC_MURAL_API_KEY;
if (!API_KEY) throw new InterceptorError("MURAL_API_KEY not defined in environment.");

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      return Promise.reject(new InterceptorError("config.headers is: " + typeof config.headers));
    }

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${API_KEY}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
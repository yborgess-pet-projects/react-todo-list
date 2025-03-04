import axios from "axios";
import {config} from "../config";

export const axiosConfig = {
  baseURL: config.BACKEND_BASE_URL,
  timeout: config.BACKEND_TIMEOUT,
  headers: { 'Content-Type': 'application/json' }
}

export const todosApi = axios.create(axiosConfig);


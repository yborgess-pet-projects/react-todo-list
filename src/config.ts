const apiVersion = import.meta.env.VITE_API_VERSION as string;
const backendUrl = import.meta.env.VITE_BACKEND_URL as string??'';
const timeout = import.meta.env.VITE_BACKEND_TIMEOUT as number;

export const config = {
  BACKEND_BASE_URL: backendUrl + apiVersion,
  BACKEND_TIMEOUT: timeout
}

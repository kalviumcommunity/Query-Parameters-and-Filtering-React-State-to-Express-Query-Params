// Already wired for you (this was LU 2.2's work). You do NOT need to edit this.
// It creates an Axios instance with the base URL and headers pre-configured.
// The auto-grader checks that the Axios instance is created with the correct base URL and headers.
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;

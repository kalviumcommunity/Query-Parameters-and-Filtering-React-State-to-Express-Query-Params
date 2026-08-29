import apiClient from "./apiClient";

export const getThreads = async (filters = {}) => {
  const response = await apiClient.get("/api/threads", {
    params: filters,
  });
  return response.data;
};
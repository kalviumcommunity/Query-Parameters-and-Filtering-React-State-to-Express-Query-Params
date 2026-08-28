export function getThreads(filters) {
  return apiClient
    .get("/api/threads", { params: filters })
    .then((res) => res.data);
}
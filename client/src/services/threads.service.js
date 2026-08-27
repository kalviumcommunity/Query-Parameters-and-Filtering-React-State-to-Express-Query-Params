// ─────────────────────────────────────────────────────────────
// TODO (1/2): Make getThreads() accept the filters and forward them to Axios.
//
// Right now it ignores everything and always requests the full list, so the
// search box and sort dropdown have no effect on the server.
//
// Requirements:
//   • Accept a `filters` argument — an object like { search, sort }.
//   • Pass it to Axios as request params.
// ─────────────────────────────────────────────────────────────

import apiClient from "./apiClient";

export async function getThreads(filters) {
  const response = await apiClient.get("/api/threads", {
    params: filters,
  });

  return response.data;
}
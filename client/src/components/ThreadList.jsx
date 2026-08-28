// ─────────────────────────────────────────────────────────────
// TODO (2/2): Wire the search + sort UI to the query.
//
// Right now the queryKey is static (["threads"]) and the SearchBar / SortDropdown
// are rendered but not connected — so typing and sorting do nothing.
//
// Requirements (the auto-grader checks these):
//   • Add `search` and `sort` state (useState).
//   • Debounce the SEARCH value with useDebounce(search, 300) — the debounced
//     value is what goes into the queryKey. Do NOT debounce the sort.
//   • Make the queryKey DYNAMIC — include BOTH the debounced search and the sort:
//       queryKey: ["threads", { search: debouncedSearch, sort }]
//   • Pass the filters from the queryKey into getThreads:
//       queryFn: ({ queryKey }) => getThreads(queryKey[1])
//   • (recommended) add placeholderData: keepPreviousData so the list does not
//     flash a skeleton on every filter change.
//   • Wire <SearchBar value={search} onChange={setSearch} /> and
//     <SortDropdown value={sort} onChange={setSort} />.
//
// Verify in DevTools → Network: typing "react" produces ONE request per pause
// (GET /api/threads?search=react&sort=newest); changing the sort refetches
// immediately with the new sort in the URL.
// ─────────────────────────────────────────────────────────────
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import ThreadCard from "./ThreadCard";

export default function ThreadList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: threads = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: ({ queryKey }) => getThreads(queryKey[1]),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="thread-list-container">
      <div className="filters-bar">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {isError && (
        <div className="error-message">
          <p>Error loading threads: {error.message}</p>
        </div>
      )}

      {isPending ? (
        <p className="loading-state">Loading threads...</p>
      ) : threads.length === 0 ? (
        <p className="empty-state">No threads found.</p>
      ) : (
        <div className="threads-grid">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </div>
  );
}
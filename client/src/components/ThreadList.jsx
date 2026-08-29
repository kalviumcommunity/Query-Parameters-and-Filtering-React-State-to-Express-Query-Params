import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

export default function ThreadList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: ({ queryKey }) => {
      const [_, filters] = queryKey;
      return getThreads(filters);
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="thread-list">
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {isLoading && <p>Loading threads...</p>}
      {isError && <p>Error loading threads: {error.message}</p>}

      {data && (
        <ul className="threads-list">
          {data.map((thread) => (
            <li key={thread.id || thread._id}>
              {thread.title || thread.name || JSON.stringify(thread)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

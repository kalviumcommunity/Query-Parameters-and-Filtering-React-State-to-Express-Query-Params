import { useState } from "react";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { useDebounce } from "../hooks/useDebounce";
import { getThreads } from "../services/threads.service";
import SearchBar from "./SearchBar.jsx";
import SortDropdown from "./SortDropdown.jsx";

export default function ThreadList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: ({ queryKey }) => getThreads(queryKey[1]),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="filters">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <SortDropdown
          value={sort}
          onChange={setSort}
        />
      </div>

      {isError && <p className="err">Error: {error.message}</p>}

      {isPending ? (
        <p>Loading threads…</p>
      ) : (
        <ul className="threads">
          {data.map((t) => (
            <li className="card" key={t.id}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

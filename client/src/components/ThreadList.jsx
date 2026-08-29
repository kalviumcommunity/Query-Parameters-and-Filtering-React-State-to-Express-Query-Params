import { useState } from "react";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { getThreads } from "../services/threads.service";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function ThreadList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: ({ queryKey }) => getThreads(queryKey[1]),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <SortDropdown
        value={sort}
        onChange={setSort}
      />
    </div>
  );
}

export default ThreadList;
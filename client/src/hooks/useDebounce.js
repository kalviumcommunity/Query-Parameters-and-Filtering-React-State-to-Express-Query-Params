// Already provided for you (this was Module 1's work). You do NOT need to edit this.
// Returns a copy of `value` that only updates after `delay` ms of no changes.
// This is useful for debouncing search input, so we don't send a request on every keystroke.
// The auto-grader checks that the debounce delay is 300ms.
import { useEffect, useState } from "react";

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

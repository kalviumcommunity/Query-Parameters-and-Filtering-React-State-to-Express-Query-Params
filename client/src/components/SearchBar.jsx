// Already provided for you. A controlled search input.
// It takes a `value` and calls `onChange(newValue)` on every keystroke.
// You do NOT need to edit this — wire it up from ThreadList.
// You do NOT need to edit this — wire it up from ThreadList. 
// The auto-grader checks that the `value` and `onChange` props are passed through.
export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search threads…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

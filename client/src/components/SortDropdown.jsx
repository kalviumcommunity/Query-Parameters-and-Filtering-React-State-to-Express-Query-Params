// Already provided for you. A controlled sort dropdown.
// It takes a `value` and calls `onChange(newValue)` when the selection changes.
// You do NOT need to edit this — wire it up from ThreadList.
// The auto-grader checks that the `value` and `onChange` props are passed through.
// You do NOT need to edit this — wire it up from ThreadList.
export default function SortDropdown({ value, onChange }) {
  return (
    <select className="sort" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="top">Top voted</option>
    </select>
  );
}

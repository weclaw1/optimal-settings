"use client";

type SearchBarProps = {
  filterText?: string;
  placeholder?: string;
  submitButton?: {
    text: string;
  };
  onFilterTextChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (data: FormData) => void;
};

export default function SearchBar({
  filterText,
  placeholder = "Search...",
  submitButton,
  onFilterTextChange,
  onSearch,
}: SearchBarProps) {
  return (
    <form className="flex" action={onSearch}>
      <input
        id="search"
        name="search"
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full m-1"
        value={filterText}
        onChange={onFilterTextChange}
      />
      {submitButton && (
        <button type="submit" className="btn btn-primary m-1">
          {submitButton.text}
        </button>
      )}
    </form>
  );
}

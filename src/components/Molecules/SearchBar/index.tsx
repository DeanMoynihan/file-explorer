import { Search, X } from "react-feather";

const SearchBar = function ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="search-container">
      <div className="search-icon">
        <Search />
      </div>
      {searchTerm !== "" && (
        <div className="search-x" onClick={() => setSearchTerm("")}>
          <X />
        </div>
      )}
      <input
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;

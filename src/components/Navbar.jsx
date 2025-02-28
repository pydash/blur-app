import React from "react";
import blur from "../assets/blur.png";
import clearIcon from "../assets/clear_icon.svg";
import "../styles/Navbar.css";

function Navbar({ searchQuery, setSearchQuery }) {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav>
      <img id="navLogo" src={blur} alt="blur" />
      <div className="search-container">
        <input
          id="searchBar"
          type="text"
          name="searchbar"
          placeholder="Search name"
          value={searchQuery}
          onChange={handleChange}
        />
        {searchQuery && (
          <img
            src={clearIcon}
            alt="clear"
            className="clear-icon"
            onClick={clearSearch}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;

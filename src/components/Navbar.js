import React, { useState } from "react";
const Navbar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-light d-flex justify-content-center">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Buscar pokemon..."
            onChange={onInputChange}
          />
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            type="submit"
            onClick={onClick}
          >
            Buscar
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;

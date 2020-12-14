import React, { useContext } from "react";
import FavoriteContext from "../context/FavoriteContext";
import logo from "../img/logo.png";

const Header = () => {
  const { favoritePokemons } = useContext(FavoriteContext);

  return (
    <div className="container">
      <div className="row pt-5 pb-5 d-flex justify-content-center">
        <div className="row">
          <div className="col-xs-8 d-flex justify-content-center">
            <img src={logo} alt="logo" width="240" height="90" />
          </div>
          <div className="col-xs-2 ml-5 d-flex align-items-center justify-content-center">
            <div>❤ {favoritePokemons.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

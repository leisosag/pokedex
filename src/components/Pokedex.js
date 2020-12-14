import React from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import spinner from "../img/spinner.gif";

const Pokedex = ({ pokemons, page, setPage, total, loading }) => {
  const lastPage = () => {
    const last = Math.max(page - 1, 0);
    setPage(last);
  };

  const nextPage = () => {
    const next = Math.min(page + 1, total);
    setPage(next);
  };

  return (
    <div className="container">
      <div className="row justify-content-between pb-3">
        <div className="col-xs-6">
          <h3 className="ml-5">Pokedex</h3>
        </div>
        <div className="col-xs-6 mr-5">
          <Pagination
            page={page + 1}
            totalPages={total}
            onLeftClick={lastPage}
            onRightClick={nextPage}
          />
        </div>
      </div>
      {loading ? (
        <div className="row justify-content-center">
          <img src={spinner} alt="spinner" />
        </div>
      ) : (
        <div className="row justify-content-around">
          {pokemons.map((pokemon, id) => {
            return <PokemonCard key={id} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;

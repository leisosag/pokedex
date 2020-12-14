import React, { useContext } from "react";
import FavoriteContext from "../context/FavoriteContext";

const PokemonCard = ({ pokemon }) => {
  const { favoritePokemons, updateFavoritePokemons } = useContext(
    FavoriteContext
  );

  const blackHeart = "🖤";
  const redHeart = "❤";

  const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

  const clickHeart = (e) => {
    e.preventDefault();
    updateFavoritePokemons(pokemon.name);
  };

  let styleType = pokemon.types[0].type.name;

  return (
    <div
      className={`card pokemon-card ${styleType} pl-3 pr-3 m-3`}
      style={{ width: "18rem" }}
    >
      <div className="card-body">
        <div className="row justify-content-between pb-3">
          <div className="col-xs-6 d-flex align-items-center">
            <h5 className="">{pokemon.name}</h5>
            <h6 className="ml-2 mt-1">#{pokemon.id}</h6>
          </div>
          <div className="col-xs-6">
            <button className="btn" onClick={clickHeart}>
              {heart}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="row d-flex flex-column justify-content-center">
              {pokemon.types.map((type, id) => {
                return (
                  <p className="pokemon-type" key={id}>
                    {type.type.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="col-8">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              className="card-img"
              alt={pokemon.name}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <h6>Abilities</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

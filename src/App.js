import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Pokedex from "./components/Pokedex";
import { getPokemonData, GetPokemons, searchPokemon } from "./api/pokeapi";
import { FavoriteProvider } from "./context/FavoriteContext";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, SetFavorites] = useState(["bulbasaur"]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const localStorageKey = "favorite_pokemon";

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await GetPokemons(21, 21 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 21));
      setNotFound(false);
    } catch (error) {}
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    SetFavorites(pokemons);
  };

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }

    SetFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);
    setSearching(true);

    const result = await searchPokemon(pokemon);

    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }

    setLoading(false);
    setSearching(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Header />
        <Navbar onSearch={onSearch} />
        {notFound ? (
          <div className="row justify-content-center">
            <h3>Pokemon no encontrado</h3>
          </div>
        ) : (
          <Pokedex
            loading={loading}
            pokemons={pokemons}
            page={page}
            setPage={setPage}
            total={total}
          />
        )}
      </div>
    </FavoriteProvider>
  );
};

export default App;

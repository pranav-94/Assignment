import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
      const results = res.data.results;

      const pokemonPromises = results.map(async (item) => {
        const res = await axios.get(item.url);
        return {
          name: res.data.name,
          image: res.data.sprites.front_default,
        };
      });

      const pokemonList = await Promise.all(pokemonPromises);
      setPokemonData(pokemonList);
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 text-lg border border-gray-300 rounded-lg"
      />
      <div className="flex flex-wrap justify-center">
        {filteredPokemon.map((pokemon, index) => (
          <div className="m-4 text-center">
            <img src={pokemon.image} alt="" className="w-24 h-24 mx-auto" />
            <p className="mt-2 text-lg font-semibold capitalize">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

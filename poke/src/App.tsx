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
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '20px', padding: '10px', fontSize: '16px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

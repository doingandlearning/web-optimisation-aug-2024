import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { savePokemonData, getPokemonData } from './utils/indexedDB';
import { Pokemon, PokemonAPIResponse } from './types';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);

        const localData = await getPokemonData();
        if (localData.length > 0) {
          setPokemon(localData);
          setLoading(false);
          console.log('Data loaded from IndexedDB');
        } else {
          const response = await fetch(POKEMON_API_URL);
          const data: PokemonAPIResponse = await response.json();

          const pokemonList: Pokemon[] = data.results.map((p, index) => ({
            id: index + 1,
            name: p.name,
            url: p.url,
          }));

          setPokemon(pokemonList);
          savePokemonData(pokemonList);
          setLoading(false);
          console.log('Data fetched from API and saved to IndexedDB');
        }
      } catch (err) {
        setError('Failed to load Pokémon data');
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Router>
      <div className="App">
        <h1>Pokémon Viewer</h1>
        <Routes>
          <Route path="/" element={<PokemonList pokemon={pokemon} />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

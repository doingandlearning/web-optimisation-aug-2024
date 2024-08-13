import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonDetail, savePokemonDetail } from '../utils/indexedDB';

interface PokemonDetail {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
	};
}

export default function PokemonDetails() {
	const { id } = useParams<{ id: string }>();
	const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPokemonDetails() {
			try {
				setLoading(true);

				// Check if data is available in IndexedDB first
				const localData = await getPokemonDetail(Number(id));
				if (localData) {
					setPokemon(localData);
					setLoading(false);
					console.log('Data loaded from IndexedDB');
				} else {
					// If not available locally, fetch from API
					const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
					const data: PokemonDetail = await response.json();

					setPokemon(data);
					savePokemonDetail(data); // Save the fetched data to IndexedDB
					setLoading(false);
					console.log('Data fetched from API and saved to IndexedDB');
				}
			} catch (err) {
				setError('Failed to load Pokémon details');
				console.log(err)
				setLoading(false);
			}
		}

		fetchPokemonDetails();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		pokemon && (
			<div>
				<h2>{pokemon.name}</h2>
				<img src={pokemon.sprites.front_default} alt={pokemon.name} />
				<p>Height: {pokemon.height}</p>
				<p>Weight: {pokemon.weight}</p>
				<Link to="/">Back to list</Link>
			</div>
		)
	);
};


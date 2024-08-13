// src/PokemonList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types';

interface PokemonListProps {
	pokemon: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemon }) => {
	return (
		<ul>
			{pokemon.map((p) => (
				<li key={p.id}>
					<Link to={`/pokemon/${p.id}`}>{p.name}</Link>
				</li>
			))}
		</ul>
	);
};

export default PokemonList;

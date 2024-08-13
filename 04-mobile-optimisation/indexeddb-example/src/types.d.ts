// src/types.d.ts

export interface Pokemon {
  id: number;
  name: string;
  url: string;
}

export interface PokemonAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

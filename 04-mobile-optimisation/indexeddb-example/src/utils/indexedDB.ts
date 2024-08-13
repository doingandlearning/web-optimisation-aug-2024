// src/indexedDB.ts

import { openDB } from "idb";
import { Pokemon, PokemonDetail } from "../types";

const DB_NAME = "pokemonDB";
const STORE_NAME = "pokemonStore";
const DETAILS_STORE_NAME = "pokemonDetailsStore";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(DETAILS_STORE_NAME)) {
        db.createObjectStore(DETAILS_STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function savePokemonData(pokemonList: Pokemon[]) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  pokemonList.forEach((pokemon) => store.put(pokemon));
  await tx.done;
}

export async function getPokemonData(): Promise<Pokemon[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function savePokemonDetail(pokemonDetail: PokemonDetail) {
  const db = await initDB();
  const tx = db.transaction(DETAILS_STORE_NAME, "readwrite");
  const store = tx.objectStore(DETAILS_STORE_NAME);
  store.put(pokemonDetail);
  await tx.done;
}

export async function getPokemonDetail(
  id: number
): Promise<PokemonDetail | undefined> {
  const db = await initDB();
  return db.get(DETAILS_STORE_NAME, id);
}

export async function clearPokemonData() {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
}

export async function clearPokemonDetailsData() {
  const db = await initDB();
  const tx = db.transaction(DETAILS_STORE_NAME, "readwrite");
  await tx.objectStore(DETAILS_STORE_NAME).clear();
  await tx.done;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const response = await fetch(url, {
    next: { revalidate: 300 }, // Next.js cache
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });

  return data;
}

// Get paginated list of Pokemon
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<{ results: { name: string; url: string }[]; count: number }> {
  return fetchWithCache(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
}

// Get single Pokemon by name or ID
export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  return fetchWithCache(`${BASE_URL}/pokemon/${nameOrId}`);
}

// Get Pokemon Species
export async function getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
  return fetchWithCache(`${BASE_URL}/pokemon-species/${nameOrId}`);
}

// Get Evolution Chain
export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  return fetchWithCache(`${BASE_URL}/evolution-chain/${id}`);
}

// Get Type information
export async function getType(name: string): Promise<Type> {
  return fetchWithCache(`${BASE_URL}/type/${name}`);
}

// Get all types
export async function getAllTypes(): Promise<{ results: { name: string; url: string }[] }> {
  return fetchWithCache(`${BASE_URL}/type?limit=20`);
}

// Get Generation
export async function getGeneration(id: number): Promise<Generation> {
  return fetchWithCache(`${BASE_URL}/generation/${id}`);
}

// Get all generations
export async function getAllGenerations(): Promise<{ results: { name: string; url: string }[] }> {
  return fetchWithCache(`${BASE_URL}/generation?limit=10`);
}

// Get Ability
export async function getAbility(name: string): Promise<Ability> {
  return fetchWithCache(`${BASE_URL}/ability/${name}`);
}

// Get Move
export async function getMove(name: string): Promise<Move> {
  return fetchWithCache(`${BASE_URL}/move/${name}`);
}

// Batch fetch multiple Pokemon
export async function getPokemonBatch(ids: number[]): Promise<Pokemon[]> {
  const promises = ids.map((id) => getPokemon(id));
  return Promise.all(promises);
}

// Extract Pokemon ID from URL
export function extractPokemonId(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1] ?? '0', 10) : 0;
}

// Extract Evolution Chain ID from URL
export function extractEvolutionChainId(url: string): number {
  const matches = url.match(/\/evolution-chain\/(\d+)\//);
  return matches ? parseInt(matches[1] ?? '0', 10) : 0;
}

import type { Pokemon, PokemonSpecies, EvolutionChain, Type, Generation, Ability, Move } from '@/types';
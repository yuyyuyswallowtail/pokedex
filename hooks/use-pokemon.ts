import { useQuery } from '@tanstack/react-query';
import { getPokemon, getPokemonSpecies, getEvolutionChain, extractEvolutionChainId } from '@/services';

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => getPokemon(nameOrId),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function usePokemonSpecies(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon-species', nameOrId],
    queryFn: () => getPokemonSpecies(nameOrId),
    staleTime: 1000 * 60 * 10,
  });
}

export function useEvolutionChain(evolutionChainUrl: string) {
  const id = extractEvolutionChainId(evolutionChainUrl);
  
  return useQuery({
    queryKey: ['evolution-chain', id],
    queryFn: () => getEvolutionChain(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemonDetail(nameOrId: string | number) {
  const pokemonQuery = usePokemon(nameOrId);
  const speciesQuery = usePokemonSpecies(
    pokemonQuery.data?.species?.name ?? ''
  );
  const evolutionQuery = useEvolutionChain(
    speciesQuery.data?.evolution_chain?.url ?? ''
  );

  return {
    pokemon: pokemonQuery.data,
    species: speciesQuery.data,
    evolutionChain: evolutionQuery.data,
    isLoading: 
      pokemonQuery.isLoading || 
      speciesQuery.isLoading || 
      evolutionQuery.isLoading,
    isError: 
      pokemonQuery.isError || 
      speciesQuery.isError || 
      evolutionQuery.isError,
    error: pokemonQuery.error ?? speciesQuery.error ?? evolutionQuery.error,
  };
}
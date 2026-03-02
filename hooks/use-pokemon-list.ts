import { useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonBatch } from '@/services';

export function usePokemonList(limit: number = 20, offset: number = 0) {
  const listQuery = useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => getPokemonList(limit, offset),
    staleTime: 1000 * 60 * 10,
  });

  // Extract IDs from the list
  const ids = listQuery.data?.results.map((item) => {
    const matches = item.url.match(/\/(\d+)\/$/);
    return matches ? parseInt(matches[1] ?? '0', 10) : 0;
  }).filter((id): id is number => id > 0) ?? [];

  const detailsQuery = useQuery({
    queryKey: ['pokemon-details', ids],
    queryFn: () => getPokemonBatch(ids),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 10,
  });

  return {
    list: listQuery.data,
    pokemon: detailsQuery.data,
    isLoading: listQuery.isLoading || detailsQuery.isLoading,
    isError: listQuery.isError || detailsQuery.isError,
    error: listQuery.error ?? detailsQuery.error,
  };
}

export function useInfinitePokemon(limit: number = 20, page: number = 0) {
  const offset = page * limit;
  return usePokemonList(limit, offset);
}
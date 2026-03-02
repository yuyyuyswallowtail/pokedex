import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonBatch } from '@/services';
import type { FilterOptions, SortOptions } from '@/types';

export function usePokemonSearch() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    types: [],
    generation: null,
    abilities: [],
  });

  const [sort, setSort] = useState<SortOptions>({
    sortBy: 'id',
    sortOrder: 'asc',
  });

  // Fetch all Pokemon (we'll filter client-side for simplicity)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['all-pokemon'],
    queryFn: async () => {
      // Fetch first 151 for demo (Gen 1)
      const list = await getPokemonList(151, 0);
      const ids = list.results.map((item) => {
        const matches = item.url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1] ?? '0', 10) : 0;
      }).filter((id): id is number => id > 0);
      
      const pokemon = await getPokemonBatch(ids);
      return { list, pokemon };
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Filter and sort Pokemon
  const filteredPokemon = data?.pokemon.filter((p) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!p.name.includes(searchLower) && 
          !p.id.toString().includes(searchLower)) {
        return false;
      }
    }

    // Type filter
    if (filters.types.length > 0) {
      const pokemonTypes = p.types.map((t) => t.type.name);
      if (!filters.types.every((type) => pokemonTypes.includes(type))) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    let valueA: number | string;
    let valueB: number | string;

    switch (sort.sortBy) {
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'hp':
        valueA = a.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0;
        valueB = b.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0;
        break;
      case 'attack':
        valueA = a.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0;
        valueB = b.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0;
        break;
      case 'defense':
        valueA = a.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0;
        valueB = b.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0;
        break;
      case 'speed':
        valueA = a.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0;
        valueB = b.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0;
        break;
      default:
        valueA = a.id;
        valueB = b.id;
    }

    if (sort.sortOrder === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  }) ?? [];

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setTypes = useCallback((types: string[]) => {
    setFilters((prev) => ({ ...prev, types }));
  }, []);

  const setGeneration = useCallback((generation: string | null) => {
    setFilters((prev) => ({ ...prev, generation }));
  }, []);

  const setAbilities = useCallback((abilities: string[]) => {
    setFilters((prev) => ({ ...prev, abilities }));
  }, []);

  const setSortBy = useCallback((sortBy: SortOptions['sortBy']) => {
    setSort((prev) => ({ ...prev, sortBy }));
  }, []);

  const setSortOrder = useCallback((sortOrder: SortOptions['sortOrder']) => {
    setSort((prev) => ({ ...prev, sortOrder }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSort((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      types: [],
      generation: null,
      abilities: [],
    });
    setSort({
      sortBy: 'id',
      sortOrder: 'asc',
    });
  }, []);

  return {
    filters,
    sort,
    filteredPokemon,
    isLoading,
    isError,
    setSearch,
    setTypes,
    setGeneration,
    setAbilities,
    setSortBy,
    setSortOrder,
    toggleSortOrder,
    resetFilters,
    total: data?.pokemon.length ?? 0,
    filtered: filteredPokemon.length,
  };
}
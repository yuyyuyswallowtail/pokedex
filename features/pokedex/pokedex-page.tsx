'use client';

import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchFilters } from './search-filters';
import { PokemonGrid } from './pokemon-grid';
import { usePokemonSearch } from '@/hooks';
import type { SortOptions } from '@/types';

export function PokedexPage() {
  const {
    filters,
    sort,
    filteredPokemon,
    isLoading,
    isError,
    setSearch,
    setTypes,
    setSortBy,
    toggleSortOrder,
    resetFilters,
    total,
    filtered,
  } = usePokemonSearch();

  const [searchValue, setSearchValue] = useState(filters.search);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 300);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  const handleTypesChange = useCallback(
    (types: string[]) => {
      setTypes(types);
    },
    [setTypes]
  );

  const handleSortByChange = useCallback(
    (sortBy: SortOptions['sortBy']) => {
      setSortBy(sortBy);
    },
    [setSortBy]
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">😢</div>
        <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4">
          Failed to load Pokémon data. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Pokédex
        </h1>
        <p className="text-muted-foreground">
          Explore and discover all Pokémon
        </p>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        search={searchValue}
        selectedTypes={filters.types}
        sortBy={sort.sortBy}
        sortOrder={sort.sortOrder}
        onSearchChange={handleSearchChange}
        onTypesChange={handleTypesChange}
        onSortByChange={handleSortByChange}
        onSortOrderToggle={toggleSortOrder}
        onReset={() => {
          setSearchValue('');
          resetFilters();
        }}
        totalCount={total}
        filteredCount={filtered}
      />

      {/* Pokemon Grid */}
      <PokemonGrid pokemon={filteredPokemon} isLoading={isLoading} />
    </div>
  );
}
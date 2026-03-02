'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { getPokemonList, getPokemonBatch, getAllTypes } from '@/services';
import { PokemonCard } from '@/components/pokemon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTypeColor } from '@/lib/utils';
import type { Pokemon } from '@/types';

const GENERATIONS = [
  { id: 1, name: 'Gen I', range: [1, 151] },
  { id: 2, name: 'Gen II', range: [152, 251] },
  { id: 3, name: 'Gen III', range: [252, 386] },
  { id: 4, name: 'Gen IV', range: [387, 493] },
  { id: 5, name: 'Gen V', range: [494, 649] },
  { id: 6, name: 'Gen VI', range: [650, 721] },
  { id: 7, name: 'Gen VII', range: [722, 809] },
  { id: 8, name: 'Gen VIII', range: [810, 905] },
  { id: 9, name: 'Gen IX', range: [906, 1025] },
];

const BATCH_SIZE = 100;

export default function PokedexPage() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(60);

  // Fetch all types for filter
  const typesQuery = useQuery({
    queryKey: ['types'],
    queryFn: () => getAllTypes(),
    staleTime: Infinity,
  });

  // Determine range based on generation filter
  const generationRange = useMemo(() => {
    return selectedGeneration
      ? GENERATIONS.find((g) => g.id === selectedGeneration)?.range ?? [1, 1025]
      : [1, 1025];
  }, [selectedGeneration]);

  // Fetch ALL Pokemon list
  const listQuery = useQuery({
    queryKey: ['pokemon-list-all'],
    queryFn: () => getPokemonList(1025, 0),
    staleTime: 1000 * 60 * 30,
  });

  // Extract IDs and filter by generation
  const allIds = useMemo(() => {
    if (!listQuery.data?.results) return [];
    return listQuery.data.results
      .map((item) => {
        const matches = item.url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1] ?? '0', 10) : 0;
      })
      .filter((id): id is number => id >= generationRange[0] && id <= generationRange[1]);
  }, [listQuery.data, generationRange]);

  // Batch fetch ALL Pokemon details (in chunks for better performance)
  const allBatches = useMemo(() => {
    const batches: number[][] = [];
    for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
      batches.push(allIds.slice(i, i + BATCH_SIZE));
    }
    return batches;
  }, [allIds]);

  // Fetch all batches
  const batchQueries = useQuery({
    queryKey: ['pokemon-all-batches'],
    queryFn: async () => {
      const allPokemon: Map<number, Pokemon> = new Map();
      
      // Fetch all batches in parallel (with concurrency limit)
      const concurrencyLimit = 5;
      for (let i = 0; i < allBatches.length; i += concurrencyLimit) {
        const batchPromises = allBatches
          .slice(i, i + concurrencyLimit)
          .map((batch) => getPokemonBatch(batch));
        const results = await Promise.all(batchPromises);
        results.flat().forEach((pokemon) => {
          allPokemon.set(pokemon.id, pokemon);
        });
      }
      
      return allPokemon;
    },
    enabled: allBatches.length > 0,
    staleTime: 1000 * 60 * 30,
  });

  // All Pokemon data as array
  const allPokemon = useMemo(() => {
    if (!batchQueries.data) return [];
    return Array.from(batchQueries.data.values()).sort((a, b) => a.id - b.id);
  }, [batchQueries.data]);

  // Filter Pokemon by search and type (from ALL data)
  const filteredPokemon = useMemo(() => {
    if (allPokemon.length === 0) return [];

    return allPokemon.filter((pokemon) => {
      // Search filter
      const matchesSearch =
        search === '' ||
        pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
        pokemon.id.toString() === search;

      // Type filter
      const matchesType =
        selectedTypes.length === 0 ||
        pokemon.types.some((t) => selectedTypes.includes(t.type.name));

      return matchesSearch && matchesType;
    });
  }, [allPokemon, search, selectedTypes]);

  // Displayed Pokemon (limited for performance)
  const displayedPokemon = useMemo(() => {
    return filteredPokemon.slice(0, displayCount);
  }, [filteredPokemon, displayCount]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(60);
  }, [search, selectedTypes, selectedGeneration]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTypes([]);
    setSelectedGeneration(null);
  };

  const hasFilters = search !== '' || selectedTypes.length > 0 || selectedGeneration !== null;
  const isLoading = listQuery.isLoading || batchQueries.isLoading;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Pokédex</h1>
        <p className="text-muted-foreground">
          Explore all {listQuery.data?.count ?? '...'} Pokémon discovered so far
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Generation Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Generation</h3>
            {selectedGeneration && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGeneration(null)}
                className="h-7 px-2 text-xs"
              >
                Clear
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {GENERATIONS.map((gen) => (
              <Button
                key={gen.id}
                variant={selectedGeneration === gen.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGeneration(gen.id)}
                className="text-xs"
              >
                {gen.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Filter by Type</h3>
            {selectedTypes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTypes([])}
                className="h-7 px-2 text-xs"
              >
                Clear types
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {typesQuery.data?.results
              .filter((t) => !['unknown', 'shadow'].includes(t.name))
              .map((type) => (
                <button
                  key={type.name}
                  onClick={() => toggleType(type.name)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold uppercase transition-all ${
                    selectedTypes.includes(type.name)
                      ? 'ring-2 ring-offset-2 ring-primary'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: getTypeColor(type.name), color: 'white' }}
                >
                  {type.name}
                </button>
              ))}
          </div>
        </div>

        {/* Clear All Filters */}
        {hasFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {displayedPokemon.length} of {filteredPokemon.length} Pokémon
        {selectedGeneration && ` from Generation ${selectedGeneration}`}
        {selectedTypes.length > 0 && ` with ${selectedTypes.join('/')} type`}
      </div>

      {/* Pokemon Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading all 1025 Pokémon...</p>
        </div>
      ) : batchQueries.isError ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-destructive">Failed to load Pokémon</p>
          <Button variant="outline" onClick={() => batchQueries.refetch()} className="mt-4">
            Try again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <AnimatePresence>
            {displayedPokemon.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.01 }}
              >
                <PokemonCard pokemon={pokemon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More */}
      {displayedPokemon.length > 0 && displayedPokemon.length < filteredPokemon.length && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setDisplayCount((prev) => prev + 60)}
            className="gap-2"
          >
            Load more Pokémon ({filteredPokemon.length - displayedPokemon.length} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
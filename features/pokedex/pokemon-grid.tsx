'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PokemonCard } from '@/components/pokemon';
import { PokemonCardSkeleton } from '@/components/ui/skeleton';
import type { Pokemon } from '@/types';

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function PokemonGrid({ pokemon, isLoading, hasMore = false, onLoadMore }: PokemonGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target?.isIntersecting && hasMore && !isLoading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (isLoading && pokemon.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold">No Pokémon found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {pokemon.map((p, index) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <PokemonCard pokemon={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading more Pokémon...
            </div>
          )}
        </div>
      )}
    </>
  );
}
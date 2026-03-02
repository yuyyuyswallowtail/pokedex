'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PokemonDetailSkeleton } from '@/components/ui/skeleton';
import { StatsDisplay } from '@/components/pokemon/stats-display';
import { TypeBadges } from '@/components/pokemon/type-badge';
import { EvolutionChain } from '@/components/pokemon/evolution-chain';
import { Pokeball3D } from '@/components/three';
import { usePokemonDetail } from '@/hooks';
import { formatPokemonId, formatPokemonName, getTypeColor, getTotalStats } from '@/lib/utils';

interface PokemonDetailPageProps {
  pokemonId: string;
}

export function PokemonDetailPage({ pokemonId }: PokemonDetailPageProps) {
  const { pokemon, species, evolutionChain, isLoading, isError, error } =
    usePokemonDetail(pokemonId);
  const [showShiny, setShowShiny] = useState(false);

  if (isLoading) {
    return <PokemonDetailSkeleton />;
  }

  if (isError || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">😢</div>
        <h3 className="text-xl font-semibold mb-2">Pokémon not found</h3>
        <p className="text-muted-foreground mb-4">
          {error?.message ?? 'Could not load Pokémon data'}
        </p>
        <Link href="/pokedex">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pokédex
          </Button>
        </Link>
      </div>
    );
  }

  const types = pokemon.types.map((t) => t.type.name);
  const image = showShiny
    ? pokemon.sprites.other?.['official-artwork']?.front_shiny ??
      pokemon.sprites.front_shiny
    : pokemon.sprites.other?.['official-artwork']?.front_default ??
      pokemon.sprites.front_default;

  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus ?? '';
  const description = species?.flavor_text_entries.find(
    (f) => f.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ') ?? '';

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/pokedex">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pokédex
        </Button>
      </Link>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${getTypeColor(types[0] ?? 'normal')}20, ${getTypeColor(types[1] ?? types[0] ?? 'normal')}10)`,
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute -right-20 -top-20 h-96 w-96 rounded-full"
            style={{ backgroundColor: getTypeColor(types[0] ?? 'normal') }}
          />
          <div
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full"
            style={{ backgroundColor: getTypeColor(types[1] ?? types[0] ?? 'normal') }}
          />
        </div>

        <div className="relative grid gap-6 p-6 md:grid-cols-2">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            {/* ID and Name */}
            <div className="mb-4 text-center">
              <span className="text-sm font-medium text-muted-foreground">
                {formatPokemonId(pokemon.id)}
              </span>
              <h1 className="text-4xl font-bold capitalize md:text-5xl">
                {formatPokemonName(pokemon.name)}
              </h1>
              <p className="text-muted-foreground">{genus}</p>
            </div>

            {/* Pokemon Image */}
            <motion.div
              key={showShiny ? 'shiny' : 'normal'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square w-64 md:w-80"
            >
              <Image
                src={image ?? '/placeholder.png'}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 256px, 320px"
                priority
              />
            </motion.div>

            {/* Shiny Toggle */}
            {pokemon.sprites.front_shiny && (
              <Button
                variant={showShiny ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowShiny(!showShiny)}
                className="mt-4"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {showShiny ? 'Shiny' : 'Normal'}
              </Button>
            )}

            {/* Types */}
            <div className="mt-4">
              <TypeBadges types={types} size="lg" />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardContent className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                <div>
                  <div className="text-sm text-muted-foreground">Height</div>
                  <div className="text-lg font-semibold">
                    {(pokemon.height / 10).toFixed(1)}m
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="text-lg font-semibold">
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Base Exp</div>
                  <div className="text-lg font-semibold">
                    {pokemon.base_experience ?? '—'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Stats</div>
                  <div className="text-lg font-semibold">
                    {getTotalStats(pokemon.stats)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {description && (
              <Card className="border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <p className="text-sm leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            )}

            {/* Abilities */}
            <Card className="border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <Badge
                      key={ability.ability.name}
                      variant={ability.is_hidden ? 'secondary' : 'default'}
                      className="capitalize"
                    >
                      {formatPokemonName(ability.ability.name)}
                      {ability.is_hidden && ' (Hidden)'}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="mb-4 font-semibold">Base Stats</h3>
                <StatsDisplay stats={pokemon.stats} />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Evolution Chain */}
      {evolutionChain && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <EvolutionChain
                chain={evolutionChain.chain}
                currentId={pokemon.id}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 3D Pokeball decoration */}
      <div className="fixed right-0 top-0 h-64 w-64 opacity-30 pointer-events-none">
        <Pokeball3D className="h-full w-full" />
      </div>
    </div>
  );
}
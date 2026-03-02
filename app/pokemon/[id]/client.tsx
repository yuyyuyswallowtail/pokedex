'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Heart, Scale, Ruler, Sparkles } from 'lucide-react';
import { getPokemon, getPokemonSpecies, getEvolutionChain, extractEvolutionChainId } from '@/services';
import { TypeBadges } from '@/components/pokemon/type-badge';
import { StatsDisplay } from '@/components/pokemon/stats-display';
import { EvolutionChain } from '@/components/pokemon/evolution-chain';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatPokemonId, formatPokemonName, getTypeColor, getTotalStats } from '@/lib/utils';

interface PokemonDetailClientProps {
  pokemonId: number;
}

function getTypeGradient(types: string[]): string {
  if (types.length === 1) {
    return getTypeColor(types[0] ?? 'normal');
  }
  const color1 = getTypeColor(types[0] ?? 'normal');
  const color2 = getTypeColor(types[1] ?? 'normal');
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

export function PokemonDetailClient({ pokemonId }: PokemonDetailClientProps) {
  // Fetch basic Pokemon data
  const pokemonQuery = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemon(pokemonId),
    enabled: !isNaN(pokemonId),
    staleTime: 1000 * 60 * 30,
  });

  // Fetch species data
  const speciesQuery = useQuery({
    queryKey: ['pokemon-species', pokemonId],
    queryFn: () => getPokemonSpecies(pokemonId),
    enabled: !isNaN(pokemonId),
    staleTime: 1000 * 60 * 30,
  });

  // Fetch evolution chain
  const evolutionQuery = useQuery({
    queryKey: ['evolution-chain', pokemonId],
    queryFn: async () => {
      if (!speciesQuery.data) return null;
      const chainId = extractEvolutionChainId(speciesQuery.data.evolution_chain.url);
      return getEvolutionChain(chainId);
    },
    enabled: !!speciesQuery.data,
    staleTime: 1000 * 60 * 30,
  });

  if (pokemonQuery.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (pokemonQuery.isError || !pokemonQuery.data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-destructive">Failed to load Pokémon</p>
        <Link href="/pokedex">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pokédex
          </Button>
        </Link>
      </div>
    );
  }

  const pokemon = pokemonQuery.data;
  const species = speciesQuery.data;
  const types = pokemon.types.map((t) => t.type.name);

  // Get English flavor text
  const flavorText = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ') ?? '';

  // Get English genus
  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus ?? '';

  // Navigation
  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/pokedex">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Pokédex
          </Button>
        </Link>
        <div className="flex gap-2">
          {prevId && (
            <Link href={`/pokemon/${prevId}`}>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {nextId && (
            <Link href={`/pokemon/${nextId}`}>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <Card
            className="relative overflow-hidden p-8"
            style={{ background: getTypeGradient(types) }}
          >
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90" />
            <div className="relative">
              {/* Pokemon ID */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-muted-foreground">
                  {formatPokemonId(pokemon.id)}
                </span>
                <TypeBadges types={types} size="lg" />
              </div>

              {/* Image */}
              <div className="relative aspect-square">
                <Image
                  src={
                    pokemon.sprites.other?.['official-artwork']?.front_default ??
                    pokemon.sprites.front_default ??
                    '/placeholder.png'
                  }
                  alt={pokemon.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Name */}
              <h1 className="mt-4 text-center text-4xl font-bold capitalize">
                {formatPokemonName(pokemon.name)}
              </h1>
              {genus && (
                <p className="mt-2 text-center text-muted-foreground">{genus}</p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Description */}
          {flavorText && (
            <Card className="p-6">
              <p className="text-lg leading-relaxed">{flavorText}</p>
            </Card>
          )}

          {/* Basic Info */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Basic Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Base Experience</p>
                  <p className="font-semibold">{pokemon.base_experience ?? 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Catch Rate</p>
                  <p className="font-semibold">{species?.capture_rate ?? 'N/A'}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Abilities */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <Badge
                  key={ability.ability.name}
                  variant={ability.is_hidden ? 'secondary' : 'default'}
                  className="px-3 py-1"
                >
                  {formatPokemonName(ability.ability.name)}
                  {ability.is_hidden && ' (Hidden)'}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Special badges */}
          {species && (
            <div className="flex flex-wrap gap-2">
              {species.is_legendary && (
                <Badge className="bg-yellow-500 text-white">Legendary</Badge>
              )}
              {species.is_mythical && (
                <Badge className="bg-purple-500 text-white">Mythical</Badge>
              )}
              {species.is_baby && (
                <Badge className="bg-pink-500 text-white">Baby</Badge>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Base Stats</h2>
            <Badge variant="outline" className="text-sm">
              Total: {getTotalStats(pokemon.stats)}
            </Badge>
          </div>
          <StatsDisplay stats={pokemon.stats} />
        </Card>
      </motion.div>

      {/* Evolution Chain */}
      {evolutionQuery.data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Evolution Chain</h2>
            <EvolutionChain chain={evolutionQuery.data.chain} currentId={pokemon.id} />
          </Card>
        </motion.div>
      )}

      {/* Game Versions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Game Appearances</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.game_indices.slice(0, 20).map((game, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {formatPokemonName(game.version.name)}
              </Badge>
            ))}
            {pokemon.game_indices.length > 20 && (
              <Badge variant="outline" className="text-xs">
                +{pokemon.game_indices.length - 20} more
              </Badge>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
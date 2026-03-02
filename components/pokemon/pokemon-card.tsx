'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatPokemonId, formatPokemonName, getTypeColor } from '@/lib/utils';
import type { Pokemon } from '@/types';

interface PokemonCardProps {
  pokemon: Pokemon;
  showShiny?: boolean;
}

function getTypeGradient(types: string[]): string {
  if (types.length === 1) {
    return getTypeColor(types[0] ?? 'normal');
  }
  const color1 = getTypeColor(types[0] ?? 'normal');
  const color2 = getTypeColor(types[1] ?? 'normal');
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

export function PokemonCard({ pokemon, showShiny = false }: PokemonCardProps) {
  const types = pokemon.types.map((t) => t.type.name);
  const image = showShiny
    ? pokemon.sprites.other?.['official-artwork']?.front_shiny ??
      pokemon.sprites.front_shiny
    : pokemon.sprites.other?.['official-artwork']?.front_default ??
      pokemon.sprites.front_default;

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="group relative overflow-hidden border-0 shadow-lg transition-shadow hover:shadow-xl">
          {/* Background gradient based on type */}
          <div
            className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
            style={{ background: getTypeGradient(types) }}
          />

          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/5 dark:to-transparent" />

          <div className="relative p-4">
            {/* ID Badge */}
            <div className="absolute right-4 top-4">
              <span className="text-sm font-bold text-muted-foreground/50">
                {formatPokemonId(pokemon.id)}
              </span>
            </div>

            {/* Image */}
            <div className="relative aspect-square w-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Image
                  src={image ?? '/placeholder.png'}
                  alt={pokemon.name}
                  fill
                  className="object-contain drop-shadow-lg transition-transform group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={pokemon.id <= 20}
                />
              </motion.div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
            </div>

            {/* Name */}
            <div className="mt-3">
              <h3 className="text-lg font-bold capitalize transition-colors group-hover:text-primary">
                {formatPokemonName(pokemon.name)}
              </h3>
            </div>

            {/* Types */}
            <div className="mt-2 flex gap-2">
              {types.map((type) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge
                    className="border-0 px-3 py-1 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type.toUpperCase()}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Stats preview */}
            <div className="mt-3 grid grid-cols-3 gap-1 text-center text-xs">
              <div className="rounded bg-muted/50 p-1">
                <div className="font-bold text-red-500">
                  {pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat}
                </div>
                <div className="text-muted-foreground">HP</div>
              </div>
              <div className="rounded bg-muted/50 p-1">
                <div className="font-bold text-orange-500">
                  {pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat}
                </div>
                <div className="text-muted-foreground">ATK</div>
              </div>
              <div className="rounded bg-muted/50 p-1">
                <div className="font-bold text-blue-500">
                  {pokemon.stats.find((s) => s.stat.name === 'defense')?.base_stat}
                </div>
                <div className="text-muted-foreground">DEF</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
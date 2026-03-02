'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPokemonId, formatPokemonName, getTypeColor, getTotalStats } from '@/lib/utils';
import type { Pokemon } from '@/types';

interface PokemonQuickViewProps {
  pokemon: Pokemon;
  trigger?: React.ReactNode;
}

export function PokemonQuickView({ pokemon, trigger }: PokemonQuickViewProps) {
  const [open, setOpen] = useState(false);
  const [shiny, setShiny] = useState(false);

  const types = pokemon.types.map((t) => t.type.name);
  const image = shiny
    ? pokemon.sprites.other?.['official-artwork']?.front_shiny ??
      pokemon.sprites.front_shiny
    : pokemon.sprites.other?.['official-artwork']?.front_default ??
      pokemon.sprites.front_default;

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {formatPokemonName(pokemon.name)}
              <span className="text-sm font-normal text-muted-foreground">
                {formatPokemonId(pokemon.id)}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="relative">
            {/* Type background */}
            <div
              className="absolute -inset-4 -top-10 rounded-2xl opacity-10"
              style={{ background: getTypeColor(types[0] ?? 'normal') }}
            />

            {/* Image */}
            <motion.div
              key={shiny ? 'shiny' : 'normal'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto aspect-square w-48"
            >
              <Image
                src={image ?? '/placeholder.png'}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-xl"
                sizes="200px"
              />
            </motion.div>

            {/* Shiny toggle */}
            {pokemon.sprites.front_shiny && (
              <div className="mt-2 flex justify-center">
                <Button
                  variant={shiny ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShiny(!shiny)}
                >
                  ✨ {shiny ? 'Shiny' : 'Normal'}
                </Button>
              </div>
            )}

            {/* Types */}
            <div className="mt-4 flex justify-center gap-2">
              {types.map((type) => (
                <Badge
                  key={type}
                  className="px-4 py-1 text-white"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type.toUpperCase()}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat}
                </div>
                <div className="text-muted-foreground">HP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">
                  {pokemon.stats.find((s) => s.stat.name === 'attack')?.base_stat}
                </div>
                <div className="text-muted-foreground">Attack</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {pokemon.stats.find((s) => s.stat.name === 'defense')?.base_stat}
                </div>
                <div className="text-muted-foreground">Defense</div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-2 text-center">
              <span className="text-sm text-muted-foreground">Total: </span>
              <span className="font-bold">{getTotalStats(pokemon.stats)}</span>
            </div>

            {/* View Details */}
            <div className="mt-4 flex justify-center">
              <Link href={`/pokemon/${pokemon.id}`}>
                <Button>View Full Details</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
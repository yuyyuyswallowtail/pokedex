'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { formatPokemonName } from '@/lib/utils';
import type { ChainLink } from '@/types';

interface EvolutionChainProps {
  chain: ChainLink;
  currentId: number;
}

function flattenChain(chain: ChainLink): Array<{ id: number; name: string; evolvesTo: string[] }> {
  const result: Array<{ id: number; name: string; evolvesTo: string[] }> = [];
  
  function traverse(node: ChainLink) {
    const match = node.species.url.match(/\/pokemon-species\/(\d+)\//);
    const id = match ? parseInt(match[1] ?? '0', 10) : 0;
    const evolvesTo = node.evolves_to.map((e) => e.species.name);
    
    result.push({
      id,
      name: node.species.name,
      evolvesTo,
    });
    
    node.evolves_to.forEach((evolution) => {
      traverse(evolution);
    });
  }
  
  traverse(chain);
  return result;
}

export function EvolutionChain({ chain, currentId }: EvolutionChainProps) {
  const evolutions = flattenChain(chain);
  
  if (evolutions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Evolution Chain</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {evolutions.map((evolution, index) => (
          <div key={evolution.id} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link
                href={`/pokemon/${evolution.id}`}
                className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
                  evolution.id === currentId
                    ? 'bg-primary/10 ring-2 ring-primary'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="relative aspect-square w-16 md:w-20">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                    alt={evolution.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <span className="text-xs font-medium capitalize">
                  {formatPokemonName(evolution.name)}
                </span>
              </Link>
            </motion.div>
            {index < evolutions.length - 1 && (
              <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground md:mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
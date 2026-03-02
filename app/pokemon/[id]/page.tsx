import { PokemonDetailClient } from './client';

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { id } = await params;
  const pokemonId = parseInt(id, 10);

  return <PokemonDetailClient pokemonId={pokemonId} />;
}
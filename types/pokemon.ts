// Pokemon Types - Complete TypeScript interfaces for PokeAPI

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  species: NamedAPIResource;
  game_indices: GameIndex[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    home?: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions?: Record<string, Record<string, PokemonSprites>>;
  animated?: PokemonSprites;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: MoveVersionGroupDetail[];
}

export interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

// Pokemon Species and Evolution
export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  evolution_chain: NamedAPIResource;
  color: NamedAPIResource;
  genera: SpeciesGenus[];
  generation: NamedAPIResource;
  flavor_text_entries: FlavorText[];
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
  capture_rate: number;
  base_happiness: number;
  growth_rate: NamedAPIResource;
  egg_groups: NamedAPIResource[];
}

export interface SpeciesGenus {
  genus: string;
  language: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  item: NamedAPIResource | null;
  trigger: NamedAPIResource;
  gender: number | null;
  held_item: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
}

// Type and Generation
export interface Type {
  id: number;
  name: string;
  pokemon: TypePokemon[];
  moves: NamedAPIResource[];
  damage_relations: TypeDamageRelations;
}

export interface TypePokemon {
  slot: number;
  pokemon: NamedAPIResource;
}

export interface TypeDamageRelations {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
}

export interface Generation {
  id: number;
  name: string;
  pokemon_species: NamedAPIResource[];
  main_region: NamedAPIResource;
}

// Paginated Response
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Ability
export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedAPIResource;
  names: AbilityName[];
  effect_entries: AbilityEffect[];
  pokemon: AbilityPokemon[];
}

export interface AbilityName {
  name: string;
  language: NamedAPIResource;
}

export interface AbilityEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedAPIResource;
}

// Move
export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  type: NamedAPIResource;
  damage_class: NamedAPIResource;
  meta: MoveMeta | null;
  names: MoveName[];
  effect_entries: MoveEffect[];
}

export interface MoveMeta {
  ailment: NamedAPIResource;
  category: NamedAPIResource;
  min_hits: number | null;
  max_hits: number | null;
  min_turns: number | null;
  max_turns: number | null;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number | null;
  flinch_chance: number | null;
  stat_chance: number | null;
}

export interface MoveName {
  name: string;
  language: NamedAPIResource;
}

export interface MoveEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

// App-specific types
export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface PokemonDetailData {
  pokemon: Pokemon;
  species: PokemonSpecies;
  evolutionChain: EvolutionChain;
}

export interface FilterOptions {
  search: string;
  types: string[];
  generation: string | null;
  abilities: string[];
}

export interface SortOptions {
  sortBy: 'id' | 'name' | 'hp' | 'attack' | 'defense' | 'speed';
  sortOrder: 'asc' | 'desc';
}

export type PokemonTypeName = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' 
  | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' 
  | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' 
  | 'dark' | 'steel' | 'fairy';

export type StatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
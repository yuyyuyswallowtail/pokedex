import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(4, '0')}`;
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  return colors[type] ?? '#777';
}

export function getStatColor(stat: string): string {
  const colors: Record<string, string> = {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    speed: '#FA92B2',
  };
  return colors[stat] ?? '#777';
}

export function calculateStatPercentage(stat: number, maxStat: number = 255): number {
  return Math.min((stat / maxStat) * 100, 100);
}

export function getTotalStats(stats: { base_stat: number }[]): number {
  return stats.reduce((acc, stat) => acc + stat.base_stat, 0);
}

export function getGenerationRange(generation: number): { start: number; end: number } {
  const ranges: Record<number, { start: number; end: number }> = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 905 },
    9: { start: 906, end: 1025 },
  };
  return ranges[generation] ?? { start: 1, end: 1025 };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
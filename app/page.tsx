'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Pokeball3D } from '@/components/three';

const features = [
  {
    icon: Sparkles,
    title: 'Beautiful Animations',
    description: 'Smooth transitions and micro-interactions powered by Framer Motion',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with Next.js and intelligent caching',
  },
  {
    icon: Globe,
    title: 'Mobile First',
    description: 'Responsive design that works beautifully on all devices',
  },
];

const featuredPokemon = [
  { id: 25, name: 'Pikachu' },
  { id: 6, name: 'Charizard' },
  { id: 150, name: 'Mewtwo' },
  { id: 94, name: 'Gengar' },
  { id: 131, name: 'Lapras' },
  { id: 143, name: 'Snorlax' },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section - Full width with no top padding */}
      <section className="relative overflow-hidden -mx-4 -mt-6 px-4 pb-8 pt-8 sm:-mx-6 sm:-mt-8 sm:px-6 sm:pb-12 sm:pt-12 md:-mx-8 md:-mt-10 md:px-8 md:pb-16 md:pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Explore 1000+ Pokémon
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover the World of{' '}
              <span className="text-primary">Pokémon</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              A modern, interactive Pokédex with beautiful animations, 3D visuals,
              and comprehensive information about every Pokémon.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/pokedex">
                <Button size="lg" className="gap-2">
                  Explore Pokédex
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Pokeball */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto lg:max-w-none"
          >
            <Pokeball3D className="h-full w-full" />
          </motion.div>
        </div>
      </section>

      {/* Featured Pokemon */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Featured Pokémon</h2>
          <p className="text-muted-foreground">
            Some of the most iconic Pokémon to get you started
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredPokemon.map((pokemon, index) => (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/pokemon/${pokemon.id}`}>
                <div className="group relative aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden transition-transform hover:scale-105">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 16vw, 200px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                    <p className="text-xs text-white text-center capitalize font-medium">
                      {pokemon.name}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Built with Modern Technology</h2>
          <p className="text-muted-foreground">
            A production-ready Pokédex with the best practices in web development
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white" />
        </div>

        <div className="relative text-center space-y-4">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">
            Explore the complete Pokédex with over 1000 Pokémon, detailed stats,
            evolution chains, and more.
          </p>
          <Link href="/pokedex">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
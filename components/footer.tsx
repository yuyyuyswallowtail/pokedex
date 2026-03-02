import Link from 'next/link';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-gray-100" />
                <div className="absolute inset-2 rounded-full border-2 border-gray-800" />
              </div>
              <span className="text-xl font-bold">Pokédex</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern, interactive Pokédex built with Next.js, React, and Three.js.
              Explore all Pokémon with beautiful animations and 3D visuals.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pokedex" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pokédex
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://pokeapi.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    PokéAPI
                  </a>
                </li>
                <li>
                  <a
                    href="https://pokemon.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Official Pokémon
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pokédex. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js & Three.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
# 🎮 Pokédex App

A modern, interactive Pokédex application built with Next.js 14, featuring a beautiful UI with dark/light theme support, 3D Pokeball animation, and comprehensive Pokémon information.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎯 Complete Pokédex** - Browse all 1025 Pokémon with detailed information
- **🔍 Advanced Search** - Search by name or Pokédex number across the entire dataset
- **🏷️ Type Filtering** - Filter Pokémon by their elemental types (18 types)
- **📊 Generation Filter** - Filter Pokémon by game generation (Gen I - IX)
- **🌓 Dark/Light Theme** - Toggle between themes with smooth transitions
- **🎨 3D Pokeball Animation** - Interactive Three.js Pokeball on the homepage
- **⚡ Optimized Performance** - Parallel data fetching with React Query caching
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎭 Type Badges** - Color-coded type badges with icons
- **📈 Stats Visualization** - Visual stat bars for each Pokémon

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - 3D graphics with Three.js
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Data & State
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[PokéAPI](https://pokeapi.co/)** - Pokémon data source

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:yuyyuyswallowtail/pokedex.git
   cd pokedex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
pokedex/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with 3D Pokeball
│   ├── pokedex/           # Pokédex listing page
│   └── pokemon/[id]/      # Individual Pokémon detail page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── pokemon/          # Pokémon-specific components
├── features/             # Feature-specific components
├── hooks/                # Custom React hooks
├── services/             # API service functions
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎨 Key Components

### Home Page
- Interactive 3D Pokeball with Three.js
- Animated hero section
- Call-to-action buttons

### Pokédex Page
- Grid view of all 1025 Pokémon
- Real-time search functionality
- Type and generation filters
- Load more pagination

### Pokémon Detail Page
- High-quality sprites (normal & shiny)
- Type effectiveness chart
- Base stats visualization
- Evolution chain
- Moves and abilities

## 🔧 Configuration

### Environment Variables
No environment variables required! The app uses the public PokéAPI.

### Customization
- **Themes**: Edit `tailwind.config.ts` for color customization
- **Type Colors**: Modify `lib/pokemon-utils.ts` for type badge colors
- **Animations**: Adjust Framer Motion variants in components

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Optimized Images**: Next.js Image optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Nintendo/Game Freak](https://www.pokemon.com/) for creating Pokémon
- [Spriters Resource](https://www.spriters-resource.com/) for sprite resources

---

## 👨‍💻 Author

### 🚀 Bintang Mesir – Software Engineer & Web Developer

Halo! Saya Bintang Mesir, seorang Software Engineer dan Web Developer lulusan S1 Teknik Informatika dari Universitas Muhammadiyah Jakarta dengan pengalaman dalam pengembangan website modern menggunakan React JS, Express JS, Golang Fiber, dan Laravel.

🌐 **Live Portfolio**: [https://portofolio-bintang-mesir.vercel.app/](https://portofolio-bintang-mesir.vercel.app/)

📧 **Email**: [bintangmsr@gmail.com](mailto:bintangmsr@gmail.com)  
📱 **Phone**: +62 823 2197 3545  
🔗 **LinkedIn**: [linkedin.com/in/bintang-mesir](https://linkedin.com/in/bintang-mesir)

---

<p align="center">
  Made with ❤️ by <a href="https://linkedin.com/in/bintang-mesir">Bintang Mesir</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gotta_Catch_'Em_All-⚡-yellow" alt="Pokemon" />
</p>
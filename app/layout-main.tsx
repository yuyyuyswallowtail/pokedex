import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { InteractiveBackground as ParticleBackground } from '@/components/InteractiveBackground';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen text-foreground">
      <ParticleBackground />
      <Navbar />
      <main className="relative w-7xl mx-auto px-4 mb-40">
        {children}
      </main>
      <Footer />
    </div>
  );
}
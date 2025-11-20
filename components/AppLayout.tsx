import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative w-full pt-24 pb-12 px-4 md:px-6 lg:px-8 z-0"> {/* Added z-0 to keep content below navbar */}
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
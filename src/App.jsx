import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModuleShowcase from './components/ModuleShowcase';
import AboutUsSection from './components/AboutUsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PortalsPage from './components/PortalsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <div className="cloud-bg" />
      <Navbar onNavigate={handleNavigate} />

      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} />
            <ModuleShowcase />
            <AboutUsSection />
            <FeaturesSection />
            <CTASection onNavigate={handleNavigate} />
          </>
        ) : (
          <PortalsPage onBack={() => handleNavigate('home')} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

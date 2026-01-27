import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModuleShowcase from './components/ModuleShowcase';
import AboutUsSection from './components/AboutUsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PortalsPage from './components/PortalsPage';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPortal, setSelectedPortal] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePortalClick = (portalInfo) => {
    setSelectedPortal(portalInfo);
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  const handleLoginBack = () => {
    setCurrentPage('portals');
    setSelectedPortal(null);
  };

  const handleLoginSuccess = (userData) => {
    // Login success is handled in Login component (redirects to portal)
    console.log('Login successful:', userData);
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
        ) : currentPage === 'login' ? (
          <Login
            portalInfo={selectedPortal}
            onLoginSuccess={handleLoginSuccess}
            onBack={handleLoginBack}
          />
        ) : currentPage === 'portals' ? (
          <PortalsPage 
            onBack={() => handleNavigate('home')}
            onPortalClick={handlePortalClick}
          />
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default App;

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModuleShowcase from './components/ModuleShowcase';
import AboutUsSection from './components/AboutUsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <div className="cloud-bg" />
      <Navbar />

      <main>
        <Hero />

        {/* Module Showcase Grid */}
        <ModuleShowcase />

        {/* About Us Section */}
        <AboutUsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

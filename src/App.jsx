import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModuleShowcase from './components/ModuleShowcase';
import AboutUsSection from './components/AboutUsSection';
import CloudIllustrations from './components/CloudIllustrations';
import { motion } from 'framer-motion';

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
        <section style={{ padding: '8rem 0', background: 'white' }}>
          <div className="section-container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}
              >
                Pydah Ecosystem
              </motion.h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                Connecting every part of your institution through a seamless, automated cloud infrastructure.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <CloudIllustrations />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { title: "Institutional Sync", desc: "Every department stays updated with instantaneous data synchronization across student, hostel, and HR modules." },
                  { title: "Educational Insights", desc: "Automated analytics that track student progress and institutional efficiency help you lead with data." },
                  { title: "Secure Infrastructure", desc: "Enterprise-grade encryption for student records and automated cloud backups for your peace of mind." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-soft)',
                      background: 'var(--bg-cloud)'
                    }}
                  >
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '6rem 0' }}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                padding: '4rem',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ready to elevate your institution?</h2>
              <p style={{ marginBottom: '2.5rem', opacity: 0.9, fontSize: '1.1rem' }}>Join the growing list of entities scaling with Pydah today.</p>
              <button style={{
                padding: '1rem 2.5rem',
                backgroundColor: 'white',
                color: 'var(--primary)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }}>
                Start Your Journey
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer style={{
        width: '100%',
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            padding: 'clamp(3rem, 8vh, 6rem) 0',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div style={{
            fontSize: 'clamp(3rem, 15vw, 12rem)',
            fontWeight: 900,
            color: '#1e293b',
            letterSpacing: '0.05em',
            marginBottom: 'clamp(1rem, 2vh, 2rem)',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            lineHeight: 1
          }}>
            {['P', 'Y', 'D', 'A', 'H', 'S', 'O', 'F', 'T'].map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{
                  scale: 1.2,
                  color: '#6366f1',
                  textShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                }}
                style={{
                  display: 'inline-block',
                  cursor: 'default',
                  transition: 'all 0.3s ease'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <p style={{
            color: '#64748b',
            fontSize: '1.1rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            Institutional Intelligence Redefined
          </p>
          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #f1f5f9'
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              © 2025 PydahSoft Systems. All rights reserved.
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;

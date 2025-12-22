import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Users, Home, ClipboardCheck, UserCircle, CreditCard, Box, Layout } from 'lucide-react';
import { useState } from 'react';

const solutions = [
  {
    title: 'Admissions CRM',
    desc: 'Next-generation enrollment and lead management.',
    url: 'https://admissions.pydahsoft.in',
    icon: Users,
    color: '#0ea5e9'
  },
  {
    title: 'Hostel Automation',
    desc: 'Smart and secure student residency management.',
    url: 'https://hms.pydahsoft.in',
    icon: Home,
    color: '#6366f1'
  },
  {
    title: 'Pharmacy Inventory',
    desc: 'Specially crafted stock management for college labs.',
    url: 'https://pydah-pharmacy-labs.vercel.app',
    icon: Box,
    color: '#10b981'
  },
  {
    title: 'Student Portal',
    desc: 'Unified dashboard for student academics and life.',
    url: 'https://pydahsdms.vercel.app',
    icon: UserCircle,
    color: '#f59e0b'
  },
  {
    title: 'Employee Portal',
    desc: 'Secure login for staff and faculty members.',
    url: 'https://hrms.pydahsoft.in/login',
    icon: ClipboardCheck,
    color: '#ec4899'
  },
  {
    title: 'HR & Payroll',
    desc: 'Comprehensive HR management for institutions.',
    url: 'https://hrms.pydahsoft.in',
    icon: CreditCard,
    color: '#ef4444'
  },
  {
    title: 'Administration',
    desc: 'Centralized control system for campus admins.',
    url: 'https://pydahsdms.vercel.app', // User provided link
    icon: Layout,
    color: '#64748b'
  }
];

const Navbar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: '1rem 0',
      borderBottom: '1px solid var(--border-soft)'
    }}>
      <div className="section-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src="/logo1-2048x1024.png"
            alt="Pydah Logo"
            style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}
          />
        </div>

        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Home</a>

          {/* Solutions Dropdown / Mega Menu Trigger */}
          <div
            style={{ position: 'relative' }}
          >
            <button
              style={{
                fontWeight: 500,
                color: isMegaMenuOpen ? 'var(--primary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'color 0.2s ease'
              }}
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            >
              Our Portals <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(920px, 92vw)',
                    maxWidth: '920px',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    border: '1px solid #f1f5f9',
                    zIndex: 2000,
                    maxHeight: 'calc(100vh - 120px)',
                    overflowY: 'auto'
                  }}
                >
                  {/* Mega Menu Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'clamp(1rem, 2vw, 2rem)'
                  }}>
                    {solutions.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          padding: '0.75rem',
                          borderRadius: '16px',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        className="mega-menu-item"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: `${item.color}10`,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: item.color,
                          flexShrink: 0
                        }}>
                          <item.icon size={22} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                            {item.desc}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>


                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#about" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>About Us</a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.75rem 1.75rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              boxShadow: 'var(--shadow-soft)'
            }}
          >
            Get Help
          </motion.button>
        </div>

        <div className="mobile-toggle" style={{ display: 'none' }}>
          {/* Mobile menu logic would go here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { motion } from 'framer-motion';
import {
    Users, BookOpen, CreditCard, ClipboardCheck,
    UserRound, Home, Brain, Activity, ArrowRight
} from 'lucide-react';

const modules = [
    {
        id: 'intel',
        title: 'Intelligence',
        desc: 'Harness AI-driven insights for data-backed institutional decisions.',
        icon: Brain,
        color: '#8b5cf6',
        spanX: 4, // Spans 4 out of 6 columns (2/3 width)
        spanY: 2,
        light: true
    },
    {
        id: 'admit',
        title: 'Admissions',
        desc: 'Streamline enrollment and lead pipeline.',
        icon: Users,
        color: '#0ea5e9',
        spanX: 2, // Spans 2 out of 6 columns (1/3 width)
        spanY: 2
    },
    {
        id: 'academic',
        title: 'Academics',
        desc: 'Complete curriculum planning and digital student records.',
        icon: BookOpen,
        color: '#f59e0b',
        spanX: 2,
        spanY: 1
    },
    {
        id: 'finance',
        title: 'Finance',
        desc: 'Automated fee collection and financial reporting.',
        icon: CreditCard,
        color: '#10b981',
        spanX: 2,
        spanY: 1
    },
    {
        id: 'exams',
        title: 'Exams',
        desc: 'Automated assessment and result management.',
        icon: ClipboardCheck,
        color: '#f97316',
        spanX: 2,
        spanY: 1
    },
    {
        id: 'hostel',
        title: 'Hostel CRM',
        desc: 'Integrated residency management and student safety tracking.',
        icon: Home,
        color: '#6366f1',
        spanX: 3,
        spanY: 2
    },
    {
        id: 'hr',
        title: 'HR & Payroll',
        desc: 'Automated staff records and payroll cycles.',
        icon: UserRound,
        color: '#ec4899',
        spanX: 3,
        spanY: 2
    },
    {
        id: 'engage',
        title: 'Engagement',
        desc: 'Unified dashboard for student life and activities.',
        icon: Activity,
        color: '#64748b',
        spanX: 6, // Full width row
        spanY: 1
    }
];

const ModuleShowcase = () => {
    return (
        <section style={{
            padding: '10rem 0',
            background: '#ffffff',
            position: 'relative'
        }}>
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        style={{
                            color: 'var(--primary)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '5px',
                            fontSize: '0.7rem',
                            display: 'block',
                            marginBottom: '1rem'
                        }}
                    >
                        Digital Ecosystem
                    </motion.span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.04em' }}>
                        Unified Institutional <br />
                        <span style={{ color: '#cbd5e1' }}>Intelligence Core.</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)', // 6-column base grid
                    gridAutoFlow: 'dense',
                    gap: '1.25rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }} className="bento-grid">

                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}
                            style={{
                                gridColumn: `span ${mod.spanX}`,
                                gridRow: `span ${mod.spanY}`,
                                background: mod.light ? 'white' : 'white',
                                padding: '2.5rem',
                                borderRadius: '35px',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: mod.spanY > 1 ? 'space-between' : 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                minHeight: mod.spanY === 1 ? '160px' : '340px'
                            }}
                        >
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    backgroundColor: `${mod.color}10`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: mod.color,
                                    marginBottom: mod.spanY > 1 ? '1.5rem' : '1rem'
                                }}>
                                    <mod.icon size={24} />
                                </div>

                                <h3 style={{
                                    fontSize: mod.spanX > 3 ? '1.8rem' : '1.15rem',
                                    fontWeight: 800,
                                    marginBottom: '0.6rem',
                                    color: '#1e293b',
                                    letterSpacing: '-0.02em'
                                }}>
                                    {mod.title}
                                </h3>
                                <p style={{
                                    color: '#64748b',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    maxWidth: mod.spanX > 4 ? '500px' : '100%',
                                    display: mod.spanX < 2 && mod.spanY < 2 ? 'none' : 'block'
                                }}>
                                    {mod.desc}
                                </p>
                            </div>

                            {mod.spanY > 1 && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: mod.color,
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    marginTop: '1.5rem',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    Explore <ArrowRight size={14} />
                                </div>
                            )}

                            {/* Decorative faint glow */}
                            <div style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '-20%',
                                width: '100px',
                                height: '100px',
                                background: mod.color,
                                filter: 'blur(60px)',
                                opacity: 0.05,
                                zIndex: 1
                            }} />
                        </motion.div>
                    ))}

                </div>
            </div>

            <style>
                {`
          @media (max-width: 1024px) {
            .bento-grid {
              grid-template-columns: repeat(4, 1fr) !important;
            }
            .bento-grid > div {
              grid-column: span 2 !important;
            }
          }
          @media (max-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr !important;
            }
            .bento-grid > div {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
              min-height: auto !important;
            }
          }
        `}
            </style>
        </section>
    );
};

export default ModuleShowcase;

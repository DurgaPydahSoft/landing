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
        spanX: 4,
        spanY: 2,
        light: true
    },
    {
        id: 'admit',
        title: 'Admissions',
        desc: 'Streamline enrollment and lead pipeline.',
        icon: Users,
        color: '#0ea5e9',
        spanX: 2,
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
        spanX: 6,
        spanY: 1
    }
];

const ModuleShowcase = () => {
    const getGridClasses = (spanX, spanY) => {
        // Mobile: always span 1
        // Tablet (sm): span 1
        // Tablet (md): span 1
        // Desktop (lg): use custom spans
        const baseClasses = 'col-span-1';
        const lgClasses = {
            4: 'lg:col-span-4',
            3: 'lg:col-span-3',
            2: 'lg:col-span-2',
            6: 'lg:col-span-6',
        };
        const rowClasses = {
            2: 'lg:row-span-2',
            1: 'lg:row-span-1',
        };
        
        return `${baseClasses} ${lgClasses[spanX] || 'lg:col-span-2'} ${rowClasses[spanY] || 'lg:row-span-1'}`;
    };

    const getMinHeight = (spanX, spanY) => {
        if (spanY === 2) return 'lg:min-h-[340px]';
        if (spanX === 6) return 'lg:min-h-[160px]';
        return 'min-h-[200px] sm:min-h-[240px] lg:min-h-[160px]';
    };

    return (
        <section className="bg-white relative" style={{ 
            paddingTop: 'clamp(4rem, 10vw, 10rem)',
            paddingBottom: 'clamp(4rem, 10vw, 10rem)',
            overflowX: 'hidden'
        }}>
            <div className="section-container">
                <div className="text-center" style={{ 
                    marginBottom: 'clamp(3rem, 8vw, 6rem)'
                }}>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="font-extrabold uppercase tracking-tight block"
                        style={{ 
                            color: 'var(--color-primary)',
                            fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
                            letterSpacing: 'clamp(0.2rem, 0.5vw, 0.3125rem)',
                            marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)'
                        }}
                    >
                        Digital Ecosystem
                    </motion.span>
                    <h2 className="font-extrabold text-slate-900 leading-tight tracking-tight" style={{ 
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        lineHeight: '1.1'
                    }}>
                        Unified Institutional <br />
                        <span className="text-slate-300">Intelligence Core.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 auto-rows-auto" style={{ 
                    gap: 'clamp(1rem, 2.5vw, 1.5rem)'
                }}>
                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            whileHover={{ y: -5 }}
                            className={`
                                ${getGridClasses(mod.spanX, mod.spanY)}
                                ${getMinHeight(mod.spanX, mod.spanY)}
                                bg-white rounded-[clamp(20px,4vw,35px)] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between cursor-pointer relative overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-shadow
                            `}
                            style={{
                                padding: 'clamp(1.25rem, 3.5vw, 2.5rem)'
                            }}
                        >
                            <div className="relative z-10">
                                <div 
                                    className="rounded-xl flex justify-center items-center flex-shrink-0"
                                    style={{
                                        width: 'clamp(2.5rem, 4vw, 3rem)',
                                        height: 'clamp(2.5rem, 4vw, 3rem)',
                                        backgroundColor: `${mod.color}10`,
                                        color: mod.color,
                                        marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)'
                                    }}
                                >
                                    <mod.icon size={24} />
                                </div>

                                <h3 className="font-extrabold tracking-tight" style={{ 
                                    color: 'var(--color-text-main)',
                                    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                                    marginBottom: 'clamp(0.625rem, 1.5vw, 0.75rem)',
                                    lineHeight: '1.3'
                                }}>
                                    {mod.title}
                                </h3>
                                <p className="leading-relaxed" style={{ 
                                    color: 'var(--color-text-muted)',
                                    fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                                    lineHeight: '1.6'
                                }}>
                                    {mod.desc}
                                </p>
                            </div>

                            <div 
                                className="flex items-center font-bold relative z-10"
                                style={{ 
                                    color: mod.color,
                                    gap: 'clamp(0.5rem, 1.2vw, 0.625rem)',
                                    fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)',
                                    marginTop: 'clamp(1.25rem, 3vw, 1.5rem)'
                                }}
                            >
                                Explore <ArrowRight size={14} />
                            </div>

                            {/* Decorative faint glow */}
                            <div 
                                className="absolute -top-[20%] -right-[20%] blur-[60px] opacity-[0.05] z-0"
                                style={{ 
                                    background: mod.color,
                                    width: 'clamp(80px, 12vw, 100px)',
                                    height: 'clamp(80px, 12vw, 100px)'
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ModuleShowcase;

import { motion } from 'framer-motion';
import { Eye, Target, Lightbulb } from 'lucide-react';

const AboutUsSection = () => {
    return (
        <section id="about" className="bg-white relative" style={{ 
            paddingTop: 'clamp(4rem, 10vw, 10rem)',
            paddingBottom: 'clamp(4rem, 10vw, 10rem)',
            overflowX: 'hidden'
        }}>
            <div className="section-container">
                <div className="text-center" style={{ 
                    marginBottom: 'clamp(3rem, 8vw, 6rem)'
                }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-extrabold text-slate-900 tracking-tight"
                        style={{ 
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            lineHeight: '1.1',
                            marginBottom: 'clamp(1.5rem, 3.5vw, 2rem)'
                        }}
                    >
                        About <span style={{ color: 'var(--color-primary)' }}>Us</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="leading-relaxed"
                        style={{ 
                            color: 'var(--color-text-muted)',
                            maxWidth: '750px',
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            lineHeight: '1.6',
                            margin: '0 auto',
                            textAlign: 'center'
                        }}
                    >
                        Pydah stands at the intersection of institutional automation and human-centric design,
                        transforming fragmented legacy systems into intelligent, interconnected ecosystems.
                    </motion.p>
                </div>

                {/* Branching Connection Container */}
                <div className="relative flex flex-col" style={{ 
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>
                    {/* Main Vertical Spine (SVG) - Hidden on mobile */}
                    <div className="about-spine absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full pointer-events-none z-10 hidden md:block">
                        <svg width="2" height="100%" preserveAspectRatio="none">
                            <motion.line
                                x1="1" y1="0" x2="1" y2="100%"
                                stroke="var(--primary)"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                opacity="0.2"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                        </svg>
                    </div>

                    {/* Cards Content */}
                    <div className="relative z-20">
                        <BranchBlock
                            title="Our Vision"
                            icon={<Eye size={28} color="var(--primary)" />}
                            side="left"
                            content="We empower institutions with data-driven decision tools, streamlining the soil for institutional growth across India with minimal administrative effort."
                            delay={0.1}
                        />

                        <BranchBlock
                            title="Our Mission"
                            icon={<Target size={28} color="#ec4899" />}
                            side="right"
                            content="Revolutionizing legacy software into interconnected, intelligent interfaces that fuel productivity and collaboration for a new era in education."
                            delay={0.3}
                        />

                        <BranchBlock
                            title="Our Ideology"
                            icon={<Lightbulb size={28} color="#f59e0b" />}
                            side="left"
                            content="Removing the friction of administrative complexity, we allow educators to focus on learning and innovation by creating boundless institutional spaces."
                            delay={0.5}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const BranchBlock = ({ title, icon, content, side, delay }) => {
    return (
        <div className="relative w-full" style={{ 
            marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
            {/* Horizontal Branch - Hidden on mobile */}
            <div className={`branch-line absolute top-1/2 -translate-y-1/2 z-10 hidden md:block ${
                side === 'left' ? 'right-1/2 w-[10%]' : 'left-1/2 w-[10%]'
            }`}>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: delay + 0.3 }}
                    className={`w-full opacity-30 ${
                        side === 'left' ? 'origin-right' : 'origin-left'
                    }`}
                    style={{ 
                        backgroundColor: 'var(--color-primary)',
                        height: 'clamp(0.125rem, 0.3vw, 0.25rem)'
                    }}
                />

                {/* Junction Point on Spine */}
                <div className={`absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)] ${
                    side === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                }`} style={{ 
                    backgroundColor: 'var(--color-primary)',
                    width: 'clamp(0.5rem, 1vw, 0.625rem)',
                    height: 'clamp(0.5rem, 1vw, 0.625rem)'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay }}
                className={`flex items-center w-full ${
                    side === 'left' ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
                }`}
            >
                <div className="branch-card bg-white border border-slate-100 relative flex flex-col md:w-[40%] md:max-w-none" style={{ 
                    maxWidth: '500px',
                    padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                    borderRadius: 'clamp(24px, 5vw, 40px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                    gap: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}>
                    {/* Linked Dot on Card Edge - Hidden on mobile */}
                    <div className={`branch-dot absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)] z-30 hidden md:block ${
                        side === 'left' ? '-right-1.5' : '-left-1.5'
                    }`} style={{ 
                        backgroundColor: 'var(--color-primary)',
                        width: 'clamp(0.625rem, 1.2vw, 0.75rem)',
                        height: 'clamp(0.625rem, 1.2vw, 0.75rem)'
                    }} />

                    <div className="rounded-2xl bg-slate-50 flex justify-center items-center border border-slate-100 flex-shrink-0" style={{ 
                        width: 'clamp(3rem, 5vw, 3.5rem)',
                        height: 'clamp(3rem, 5vw, 3.5rem)'
                    }}>
                        {icon}
                    </div>

                    <div>
                        <h3 className="font-extrabold tracking-tight" style={{ 
                            color: 'var(--color-text-main)',
                            fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
                            marginBottom: 'clamp(0.75rem, 1.8vw, 1rem)',
                            lineHeight: '1.3'
                        }}>
                            {title}
                        </h3>
                        <p className="leading-relaxed" style={{ 
                            color: 'var(--color-text-muted)',
                            fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                            lineHeight: '1.6'
                        }}>
                            {content}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUsSection;

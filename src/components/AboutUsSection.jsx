import { motion } from 'framer-motion';
import { Eye, Target, Lightbulb } from 'lucide-react';

const AboutUsSection = () => {
    return (
        <section id="about" style={{
            padding: '10rem 0',
            background: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.03em' }}
                    >
                        About <span style={{ color: 'var(--primary)' }}>Us</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ color: '#64748b', maxWidth: '750px', margin: '0 auto', lineHeight: '1.8', fontSize: '1.1rem' }}
                    >
                        Pydah stands at the intersection of institutional automation and human-centric design,
                        transforming fragmented legacy systems into intelligent, interconnected ecosystems.
                    </motion.p>
                </div>

                {/* Branching Connection Container */}
                <div style={{
                    position: 'relative',
                    maxWidth: '1100px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    {/* Main Vertical Spine (SVG) */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: '2px',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 1,
                        transform: 'translateX(-50%)'
                    }}>
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
                    <div style={{ position: 'relative', zIndex: 2 }}>
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
        <div style={{ position: 'relative', width: '100%', marginBottom: '4rem' }}>

            {/* Horizontal Branch - Perfectly Linked to Spine and Card */}
            <div style={{
                position: 'absolute',
                top: '50%',
                [side === 'left' ? 'right' : 'left']: '50%',
                width: '10%', // From spine (50%) to card (which is 40% wide)
                height: '2px',
                transform: 'translateY(-50%)',
                zIndex: 1
            }}>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: delay + 0.3 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--primary)',
                        opacity: 0.3,
                        transformOrigin: side === 'left' ? 'right' : 'left'
                    }}
                />

                {/* Junction Point on Spine */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    [side === 'left' ? 'right' : 'left']: '0',
                    width: '8px',
                    height: '8px',
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    transform: `translate(${side === 'left' ? '50%' : '-50%'}, -50%)`,
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay }}
                style={{
                    display: 'flex',
                    justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
                    alignItems: 'center'
                }}
            >
                <div style={{
                    width: '40%',
                    padding: '3rem',
                    background: 'white',
                    borderRadius: '40px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {/* Linked Dot on Card Edge */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        [side === 'left' ? 'right' : 'left']: '-5px',
                        width: '10px',
                        height: '10px',
                        background: 'var(--primary)',
                        borderRadius: '50%',
                        transform: 'translateY(-50%)',
                        boxShadow: '0 0 12px rgba(99, 102, 241, 0.5)',
                        zIndex: 3
                    }} />

                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: '#f8fafc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #f1f5f9'
                    }}>
                        {icon}
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
                            {title}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7 }}>
                            {content}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUsSection;

import { motion } from 'framer-motion';
import BrowserMock from './BrowserMock';

const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '80px', // For navbar
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="section-container" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr', // Even more weight to browser
                gap: 'clamp(2rem, 5vw, 6rem)',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1600px', // Overriding global max-width for Hero
                paddingTop: '2rem'
            }}>
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)', // Slightly larger
                        lineHeight: 1.05,
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        color: 'var(--text-main)',
                        letterSpacing: '-0.03em'
                    }}>
                        Integrated <br />
                        <span style={{
                            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Institutional Solution</span> <br />
                        for Excellence.
                    </h1>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-muted)',
                        marginBottom: '2.5rem',
                        maxWidth: '500px'
                    }}>
                        Experience the smoothness of high-performance management.
                        Automate portals, hostels, HRMS, and inventory in one elegant interface.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '1rem 2rem',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                boxShadow: 'var(--shadow-soft)'
                            }}
                        >
                            Get Started
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '1rem 2rem',
                                border: '1px solid var(--border-soft)',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                color: 'var(--text-main)',
                                backgroundColor: 'white'
                            }}
                        >
                            Explore Portals
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Content - Browser Mock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: 50 }}
                    animate={{ opacity: 1, scale: 1.1, x: 0 }} // Scaling up to 1.1 for "bigger" look
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    style={{
                        perspective: '2000px',
                        transformOrigin: 'center left',
                        width: '100%',
                        zIndex: 10
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotateZ: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <BrowserMock />
                    </motion.div>

                    {/* Decorative SVG elements */}
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', zIndex: -1 }}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <motion.circle
                                cx="100" cy="100" r="80"
                                fill="var(--secondary)"
                                opacity="0.1"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

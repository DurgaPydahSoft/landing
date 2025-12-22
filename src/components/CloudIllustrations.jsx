import { motion } from 'framer-motion';

const CloudIllustrations = () => {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible'
        }}>
            {/* Central Node */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    zIndex: 10,
                    width: '120px',
                    height: '120px',
                    background: 'white',
                    borderRadius: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-glass)',
                    border: '1px solid var(--border-soft)'
                }}
            >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
                </svg>
            </motion.div>

            {/* Orbiting Elements */}
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        x: [Math.cos(i * 1.5) * 150, Math.cos(i * 1.5) * 180, Math.cos(i * 1.5) * 150],
                        y: [Math.sin(i * 1.5) * 150, Math.sin(i * 1.5) * 120, Math.sin(i * 1.5) * 150],
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: '80px',
                        height: '80px',
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2">
                        {i === 0 && <circle cx="12" cy="12" r="9" />}
                        {i === 1 && <path d="M12 2v20M2 12h20" />}
                        {i === 2 && <rect x="4" y="4" width="16" height="16" rx="2" />}
                        {i === 3 && <path d="M3 3h18v18H3zM9 9h6v6H9z" />}
                    </svg>
                </motion.div>
            ))}

            {/* Connecting Lines (Simulated by subtle strokes) */}
            <svg
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
                viewBox="0 0 100 100" preserveAspectRatio="none"
            >
                <motion.path
                    d="M50 50 Q 70 30, 80 50"
                    stroke="var(--primary)"
                    strokeWidth="0.1"
                    fill="none"
                    opacity="0.2"
                    animate={{ d: ["M50 50 Q 70 30, 80 50", "M50 50 Q 70 70, 80 50", "M50 50 Q 70 30, 80 50"] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.path
                    d="M50 50 Q 30 70, 20 50"
                    stroke="var(--secondary)"
                    strokeWidth="0.1"
                    fill="none"
                    opacity="0.2"
                    animate={{ d: ["M50 50 Q 30 70, 20 50", "M50 50 Q 30 30, 20 50", "M50 50 Q 30 70, 20 50"] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </svg>
        </div>
    );
};

export default CloudIllustrations;

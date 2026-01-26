import { motion } from 'framer-motion';

const CloudIllustrations = () => {
    return (
        <div className="relative w-full h-[400px] flex justify-center items-center overflow-visible">
            {/* Central Node */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="z-10 w-[120px] h-[120px] bg-white rounded-[30px] flex justify-center items-center border"
                style={{ boxShadow: 'var(--shadow-glass)', borderColor: 'var(--color-border-soft)' }}
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
                    className="absolute w-20 h-20 bg-white/60 backdrop-blur-md rounded-[20px] flex justify-center items-center border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
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
                className="absolute top-0 left-0 w-full h-full -z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
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

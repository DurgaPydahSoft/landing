import { motion } from 'framer-motion';

const Footer = () => {
    const letters = ['P', 'Y', 'D', 'A', 'H', 'S', 'O', 'F', 'T'];

    return (
        <footer className="w-full border-t relative" style={{ 
            backgroundColor: 'var(--color-bg-cloud)', 
            borderColor: 'var(--color-border-soft)',
            overflowX: 'hidden'
        }}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center relative z-20"
                    style={{ 
                        paddingTop: 'clamp(3rem, 8vw, 6rem)',
                        paddingBottom: 'clamp(3rem, 8vw, 6rem)'
                    }}
                >
                    <div className="font-black uppercase flex justify-center flex-wrap leading-none" style={{ 
                        fontSize: 'clamp(3rem, 15vw, 12rem)',
                        letterSpacing: 'clamp(0.05em, 0.1vw, 0.1em)',
                        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                        color: 'var(--color-text-main)'
                    }}>
                        {letters.map((letter, idx) => (
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
                                className="inline-block cursor-default transition-all duration-300"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                    <p className="uppercase font-semibold" style={{ 
                        color: 'var(--color-text-muted)',
                        fontSize: 'clamp(0.875rem, 1.8vw, 1.125rem)',
                        letterSpacing: 'clamp(0.05em, 0.1vw, 0.1em)',
                        marginBottom: 'clamp(2rem, 4vw, 3rem)'
                    }}>
                        Institutional Intelligence Redefined
                    </p>
                    <div className="border-t" style={{ 
                        marginTop: 'clamp(2rem, 4vw, 3rem)',
                        paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
                        borderColor: 'var(--color-border-soft)'
                    }}>
                        <p style={{ 
                            color: 'var(--color-text-muted)',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                            opacity: 0.7
                        }}>
                            © 2025 PydahSoft Systems. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

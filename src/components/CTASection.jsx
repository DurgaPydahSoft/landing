import { motion } from 'framer-motion';

const CTASection = () => {
    return (
        <section className="relative" style={{ 
            paddingTop: 'clamp(4rem, 8vw, 6rem)',
            paddingBottom: 'clamp(4rem, 8vw, 6rem)',
            overflowX: 'hidden'
        }}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-white text-center rounded-3xl"
                    style={{ 
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        padding: 'clamp(2.5rem, 5vw, 4rem)',
                        borderRadius: 'clamp(24px, 4vw, 32px)'
                    }}
                >
                    <h2 className="font-extrabold" style={{ 
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        lineHeight: '1.2',
                        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
                    }}>
                        Ready to elevate your institution?
                    </h2>
                    <p className="opacity-90" style={{ 
                        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                        lineHeight: '1.6',
                        marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Join the growing list of entities scaling with Pydah today.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-md font-bold whitespace-nowrap transition-all duration-200"
                        style={{ 
                            color: 'var(--color-primary)', 
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            paddingLeft: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                            paddingRight: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                            paddingTop: 'clamp(0.875rem, 2vw, 1rem)',
                            paddingBottom: 'clamp(0.875rem, 2vw, 1rem)',
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            lineHeight: '1.5'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                        }}
                    >
                        Start Your Journey
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;

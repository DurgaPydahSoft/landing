import { motion } from 'framer-motion';
import CloudIllustrations from './CloudIllustrations';

const FeaturesSection = () => {
    const features = [
        { 
            title: "Institutional Sync", 
            desc: "Every department stays updated with instantaneous data synchronization across student, hostel, and HR modules." 
        },
        { 
            title: "Educational Insights", 
            desc: "Automated analytics that track student progress and institutional efficiency help you lead with data." 
        },
        { 
            title: "Secure Infrastructure", 
            desc: "Enterprise-grade encryption for student records and automated cloud backups for your peace of mind." 
        }
    ];

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
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-extrabold"
                        style={{ 
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            lineHeight: '1.1',
                            marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                            color: 'var(--color-text-main)'
                        }}
                    >
                        Pydah Ecosystem
                    </motion.h2>
                    <p className="leading-relaxed" style={{ 
                        color: 'var(--color-text-muted)',
                        maxWidth: '600px',
                        fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                        lineHeight: '1.6',
                        textAlign: 'center',
                        margin: '0 auto'
                    }}>
                        Connecting every part of your institution through a seamless, automated cloud infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ 
                    gap: 'clamp(2rem, 5vw, 4rem)'
                }}>
                    <CloudIllustrations />

                    <div className="flex flex-col" style={{ 
                        gap: 'clamp(1.25rem, 3vw, 1.5rem)'
                    }}>
                        {features.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="rounded-md border"
                                style={{ 
                                    borderColor: 'var(--color-border-soft)', 
                                    backgroundColor: 'var(--color-bg-cloud)',
                                    padding: 'clamp(1.25rem, 3vw, 1.5rem)'
                                }}
                            >
                                <h3 className="font-bold" style={{ 
                                    color: 'var(--color-primary)',
                                    fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
                                    marginBottom: 'clamp(0.5rem, 1.2vw, 0.625rem)',
                                    lineHeight: '1.3'
                                }}>
                                    {item.title}
                                </h3>
                                <p className="leading-relaxed" style={{ 
                                    color: 'var(--color-text-muted)',
                                    fontSize: 'clamp(0.875rem, 2vw, 0.925rem)',
                                    lineHeight: '1.6'
                                }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

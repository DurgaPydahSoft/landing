import { motion } from 'framer-motion';
import CloudIllustrations from './CloudIllustrations';

const FeaturesSection = () => {
    return (
        <section className="relative bg-gradient-to-b from-white to-slate-50" style={{
            paddingTop: 'clamp(4rem, 10vw, 8rem)',
            paddingBottom: 'clamp(4rem, 10vw, 8rem)',
            overflowX: 'hidden'
        }}>
            <div className="section-container">
                {/* Header Text */}
                {/* Header Text */}
                {/* Header Text */}
                <div className="text-center" style={{
                    marginBottom: 'clamp(2rem, 5vw, 4rem)'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-extrabold text-slate-900"
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            lineHeight: '1.2',
                            marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                        }}
                    >
                        An Integrated <span className="text-indigo-600">Institutional Core.</span>
                    </motion.h2>
                    <p className="leading-relaxed text-slate-600 text-lg md:text-xl" style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>
                        Experience the power of a fully connected campus where every module—from admissions to examinations—talks to the central nervous system.
                        <span className="block mt-2 font-medium text-indigo-500">
                            One Source of Truth. Infinite Possibilities.
                        </span>
                    </p>
                </div>

                {/* Diagram Container */}
                <div className="relative w-full">
                    {/* The Diagram Component */}
                    <div className="hidden lg:block transform scale-90 origin-top">
                        <CloudIllustrations />
                    </div>

                    {/* Mobile/Tablet Fallback View (Since the complex diagram is hard to squeeze) */}
                    <div className="lg:hidden flex flex-col gap-6 items-center">
                        <div className="p-8 rounded-full bg-white border border-indigo-100 shadow-xl mb-8">
                            <span className="font-extrabold text-2xl tracking-tight text-slate-800">
                                PYDAH<span className="text-indigo-500">.</span>
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                            {['Campus Intelligence', 'Hostel Automation', 'Human Resources', 'Campus Engagement', 'Admissions', 'Academics', 'Fee Payments', 'Examinations'].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    <span className="font-semibold text-slate-700">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-400 mt-4 italic">Switch to desktop for full interactive view</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

import { motion } from 'framer-motion';
import {
    ArrowLeft, ExternalLink, CheckCircle2
} from 'lucide-react';

const portalDetails = [
    {
        title: 'Admissions CRM',
        category: 'Enrollment Management',
        desc: 'A comprehensive lead management system designed to streamline the entire student enrollment funnel. From inquiry tracking to final registration, our CRM ensures no lead is left behind.',
        features: ['Automated Lead Scoring', 'Bulk Communication Tools', 'Document Verification Hub', 'Real-time Conversion Analytics'],

        color: '#0ea5e9',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg',
        url: 'https://admissions.pydahsoft.in'
    },
    {
        title: 'Student Academic Portal',
        category: 'Learning & Lifestyle',
        desc: 'The central hub for student life. Access grades, schedules, course materials, and institutional announcements in one unified, mobile-responsive dashboard.',
        features: ['Personalized Course Timetable', 'Attendance & Grade Tracking', 'Digital Library Access', 'Campus Event Calendar'],

        color: '#f59e0b',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/free-dashboard-templates.jpg',
        url: 'https://pydahsdms.vercel.app'
    },
    {
        title: 'Hostel Automation',
        category: 'Facility Management',
        desc: 'Transform residency management with smart room allocation, security protocols, and automated mess billing systems designed for modern campus living.',
        features: ['Smart Room Allocation', 'Security & Visitor Logs', 'Automated Mess Management', 'Student Safety Dashboard'],

        color: '#6366f1',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg', // Fallback to Admin layout for consistency
        url: 'https://hms.pydahsoft.in'
    },
    {
        title: 'HRMS & Payroll',
        category: 'Staff Operations',
        desc: 'Empower your workforce with automated attendance, performance tracking, and a seamless payroll system that handles compliance and reporting automatically.',
        features: ['Automated Payroll Processing', 'Leave & Attendance Mapping', 'Performance Appraisal Hub', 'Staff Self-Service Portal'],

        color: '#ec4899',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg',
        url: 'https://hrms.pydahsoft.in'
    }
];

const PortalsPage = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-white" style={{
            paddingTop: 'clamp(80px, 12vw, 100px)',
            paddingBottom: 'clamp(4rem, 10vw, 8rem)'
        }}>
            {/* Header Area */}
            <div className="mb-24 px-4 sm:px-8 lg:px-12">
                <div className="section-container" style={{ padding: 'clamp(3rem, 6vw, 4rem) 2rem' }}>
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold text-slate-900 tracking-tight leading-none"
                        >
                            Operational <span className="text-indigo-600">Portals.</span>
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Portal Cards Section */}
            <div className="section-container px-4 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-40">
                    {portalDetails.map((portal, idx) => (
                        <motion.div
                            key={portal.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
                        >
                            {/* Image Visual - Clickable */}
                            <a
                                href={portal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full lg:w-1/2 relative group block"
                            >
                                <div
                                    className="absolute inset-0 rounded-[2.5rem] blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                                    style={{ backgroundColor: portal.color }}
                                />
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl transition-all duration-500"
                                >
                                    <img
                                        src={portal.image}
                                        alt={portal.title}
                                        className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-sm font-black text-slate-900 flex items-center gap-2">
                                            Visit {portal.title} <ExternalLink size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            </a>

                            {/* Info Content */}
                            <div className="w-full lg:w-1/2">
                                <div className="mb-8">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">
                                        {portal.category}
                                    </div>
                                    <h2 className="text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                                        {portal.title}
                                    </h2>
                                </div>

                                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                                    {portal.desc}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                                    {portal.features.map(f => (
                                        <div key={f} className="flex items-center gap-4 text-slate-700 font-bold">
                                            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                                            <span className="text-base">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default PortalsPage;

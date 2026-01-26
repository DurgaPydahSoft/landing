import { motion } from 'framer-motion';
import {
    Users, BookOpen, CreditCard, ClipboardCheck,
    Home, UserRound, Brain, Activity,
    GraduationCap, Building2, Stethoscope, LineChart
} from 'lucide-react';
import { useState } from 'react';

const EcosystemDiagram = () => {
    // Modules data matching the reference image concept but using project's specific modules
    const modules = [
        // Left Side Nodes
        { id: 'intelligence', label: 'Campus Intelligence', icon: Brain, color: '#8b5cf6', x: -350, y: -120 },
        { id: 'hostel', label: 'Hostel Automation', icon: Home, color: '#6366f1', x: -350, y: 120 },
        { id: 'hr', label: 'Human Resources', icon: UserRound, color: '#ec4899', x: -280, y: 280 }, // Bottom Left
        { id: 'engagement', label: 'Campus Engagement', icon: Activity, color: '#64748b', x: -280, y: -280 }, // Top Left

        // Right Side Nodes (Mirrored)
        { id: 'admissions', label: 'Admissions', icon: Users, color: '#0ea5e9', x: 280, y: -280 }, // Top Right
        { id: 'academics', label: 'Academics', icon: BookOpen, color: '#f59e0b', x: 350, y: -120 },
        { id: 'finance', label: 'Fee Payments', icon: CreditCard, color: '#10b981', x: 350, y: 120 },
        { id: 'exams', label: 'Examinations', icon: ClipboardCheck, color: '#f97316', x: 280, y: 280 } // Bottom Right
    ];

    const [activeNode, setActiveNode] = useState(null);

    // Helper to generate path d attribute
    const generatePath = (startX, startY, endX, endY) => {
        const midX = (startX + endX) / 2;
        // Create a circuit-like path: Start -> Horizontal -> Vertical -> Horizontal -> End
        return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
    };

    return (
        <div className="relative w-full h-[800px] flex justify-center items-center overflow-hidden my-20">
            {/* Background decorative grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* SVG Layer for Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="-500 -400 1000 800">
                {modules.map((mod, i) => {
                    // Determine start point on the central circle (approximate)
                    const isLeft = mod.x < 0;
                    const startX = isLeft ? -90 : 90;
                    const startY = (mod.y / 400) * 50; // Slight vertical offset based on target Y

                    return (
                        <g key={mod.id}>
                            {/* Base Line */}
                            <motion.path
                                d={generatePath(startX, startY, mod.x, mod.y)}
                                fill="none"
                                stroke={mod.color}
                                strokeWidth="2"
                                strokeOpacity="0.2"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "easeInOut" }}
                                viewport={{ once: true }}
                            />

                            {/* Animated Pulse on Line */}
                            <motion.path
                                d={generatePath(startX, startY, mod.x, mod.y)}
                                fill="none"
                                stroke={mod.color}
                                strokeWidth="3"
                                strokeDasharray="10 10" // Dotted effect for data flow
                                initial={{ pathLength: 0, strokeDashoffset: 20 }}
                                animate={{ strokeDashoffset: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{
                                    pathLength: { duration: 1.5, delay: 0.5 + (i * 0.1), ease: "easeInOut" },
                                    strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }
                                }}
                                viewport={{ once: true }}
                            />

                            {/* Connection Dot at Center */}
                            <motion.circle
                                cx={startX}
                                cy={startY}
                                r="4"
                                fill={mod.color}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Central Core (Hub) */}
            <motion.div
                className="z-20 relative w-48 h-48 bg-white rounded-full shadow-[0_0_60px_rgba(99,102,241,0.15)] flex justify-center items-center border-[6px]"
                style={{ borderColor: 'rgba(99,102,241,0.1)' }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
            >
                <div className="absolute inset-0 rounded-full border border-indigo-100 animate-ping opacity-20" />

                {/* Logo / Central Identity */}
                <div className="flex flex-col items-center justify-center p-6">
                    <img
                        src="/pydah-logo.png"
                        alt="Pydah Logo"
                        className="w-full h-full object-contain drop-shadow-md"
                    />
                </div>
            </motion.div>

            {/* Radiant Nodes (Spokes) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Container for absolute positioning relative to center */}
                <div className="relative w-full h-full flex justify-center items-center">
                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.id}
                            className="absolute pointer-events-auto"
                            style={{
                                x: mod.x,
                                y: mod.y,
                                // Adjust position to center the node
                                marginLeft: -40, // Half of width
                                marginTop: -40   // Half of height
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.5 + (i * 0.1), type: "spring" }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setActiveNode(mod.id)}
                            onMouseLeave={() => setActiveNode(null)}
                        >
                            <div className="flex flex-col items-center group cursor-pointer">
                                {/* Node Inner */}
                                <div className="relative">
                                    {/* Hover Glow */}
                                    <div
                                        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                                        style={{ backgroundColor: mod.color }}
                                    />

                                    {/* Icon Circle */}
                                    <div
                                        className="w-20 h-20 bg-white rounded-full shadow-lg border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                                        style={{ borderColor: mod.color }}
                                    >
                                        <mod.icon
                                            size={32}
                                            color={mod.color}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    {/* Connection Node Point (Visual anchor for line) */}
                                    <div
                                        className={`absolute w-3 h-3 rounded-full border-2 border-white top-1/2 -translate-y-1/2 ${mod.x < 0 ? '-right-1.5' : '-left-1.5'}`}
                                        style={{ backgroundColor: mod.color }}
                                    />
                                </div>

                                {/* Label */}
                                <div className="mt-4 absolute top-full w-48 text-center pointer-events-none">
                                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-600">
                                        {mod.label}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EcosystemDiagram;

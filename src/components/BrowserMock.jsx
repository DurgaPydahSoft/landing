import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Search, RotateCcw, ChevronLeft, ChevronRight, LayoutDashboard, Package, CreditCard, PieChart } from 'lucide-react';

const tabs = [
    {
        id: 'student',
        name: 'Student Portal',
        displayUrl: 'pydah-sdbms.pydahsoft.in',
        redirectUrl: 'https://pydah-sdms.vercel.app/login',
        icon: LayoutDashboard,
        color: '#8B4513', // Brown
        bgColor: '#FAF3E0'
    },
    {
        id: 'hostel',
        name: 'Hostel CRM',
        displayUrl: 'hms.pydahsoft.in',
        redirectUrl: 'https://hms.pydahsoft.in',
        icon: Package,
        color: '#0ea5e9', // Light Blue
        bgColor: '#F0F9FF'
    },
    {
        id: 'hrms',
        name: 'Payroll & HRMS',
        displayUrl: 'hrms.pydahsoft.in',
        redirectUrl: 'https://hrms.pydahsoft.in',
        icon: CreditCard,
        color: '#10b981', // Light Green
        bgColor: '#F0FDF4'
    },
    {
        id: 'inventory',
        name: 'Inventory System',
        displayUrl: 'inventory.pydahsoft.in',
        redirectUrl: 'https://pydah-pharmacy-labs.vercel.app',
        icon: PieChart,
        color: '#3B82F6', // Blue base
        theme: 'linear-gradient(135deg, #3B82F6, #6366F1)',
        bgColor: '#EFF6FF'
    },
];

const BrowserMock = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const renderContent = () => {
        const theme = activeTab.color;
        switch (activeTab.id) {
            case 'student':
                return (
                    <div style={{ padding: '1.5rem', background: 'white', height: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', color: theme }}>Student Overview</h3>
                            <div style={{ padding: '4px 12px', background: activeTab.bgColor, borderRadius: '20px', fontSize: '10px' }}>2025-26 Year</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ padding: '1rem', borderRadius: '12px', border: `1px solid ${activeTab.bgColor}`, textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: theme }}>{120 * i}</div>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{i === 1 ? 'Total' : i === 2 ? 'Courses' : 'Present'}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ height: '100px', background: activeTab.bgColor, borderRadius: '12px', opacity: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={theme} strokeWidth="1">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                    </div>
                );
            case 'inventory':
                return (
                    <div style={{ padding: '1.5rem', background: 'white', height: '100%' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1, padding: '1rem', background: activeTab.theme || theme, borderRadius: '12px', color: 'white' }}>
                                <div style={{ fontSize: '10px', opacity: 0.8 }}>Pharmacy Stock</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1,240</div>
                            </div>
                            <div style={{ flex: 1, padding: '1rem', border: '1px solid var(--border-soft)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Labs Supply</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>86%</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: activeTab.bgColor }} />
                                    <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px' }} />
                                    <div style={{ width: '40px', height: '8px', background: theme, borderRadius: '4px', opacity: 0.6 }} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'hrms':
                return (
                    <div style={{ padding: '1.5rem', background: 'white', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: activeTab.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme} strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 7a4 4 0 110-8 4 4 0 010 8z" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>HRMS Dashboard</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>152 Employees</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div style={{ height: '100px', background: activeTab.bgColor, borderRadius: '12px', padding: '1rem' }}>
                                <div style={{ width: '40%', height: '8px', background: theme, marginBottom: '0.5rem', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '4px', background: 'white' }} />
                            </div>
                            <div style={{ height: '100px', background: activeTab.bgColor, borderRadius: '12px', padding: '1rem' }}>
                                <div style={{ width: '40%', height: '8px', background: theme, marginBottom: '0.5rem', borderRadius: '4px' }} />
                                <div style={{ width: '100%', height: '4px', background: 'white' }} />
                            </div>
                        </div>
                    </div>
                );
            case 'hostel':
                return (
                    <div style={{ padding: '1.5rem', background: 'white', height: '100%' }}>
                        <div style={{ height: '80px', display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ flex: 1, borderRadius: '8px', background: activeTab.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '60%', height: '4px', background: theme, borderRadius: '2px', opacity: 0.3 }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-soft)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ width: '100px', height: '8px', background: '#f1f5f9' }} />
                                <div style={{ width: '40px', height: '8px', background: activeTab.bgColor }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {[1, 2].map(i => (
                                    <div key={i} style={{ height: '32px', borderRadius: '6px', background: '#f8fafc', border: '1px solid #f1f5f9' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '900px', // Slightly reduced from 1000px
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glass)',
            background: 'var(--bg-white)',
            border: '1px solid var(--border-soft)',
            position: 'relative'
        }}>
            {/* Window Controls (Traffic Lights) */}
            <div style={{
                background: '#f1f5f9',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid var(--border-soft)'
            }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                </div>
            </div>

            {/* Tab Bar */}
            <div style={{
                background: '#f8fafc',
                padding: '4px 12px 0 12px',
                display: 'flex',
                gap: '4px',
                borderBottom: '1px solid var(--border-soft)',
                overflowX: 'auto',
                scrollbarWidth: 'none'
            }}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab.id === tab.id;
                    return (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 16px',
                                background: isActive ? 'white' : 'transparent',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '11px',
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                                transition: 'all 0.2s ease',
                                minWidth: '130px',
                                border: isActive ? '1px solid var(--border-soft)' : '1px solid transparent',
                                borderBottom: isActive ? '1px solid transparent' : 'none',
                                marginBottom: '-1px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Icon size={14} color={tab.color} />
                            {tab.name}
                        </div>
                    );
                })}
            </div>

            {/* Address Bar */}
            <div style={{
                padding: '10px 16px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid var(--border-soft)'
            }}>
                <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)' }}>
                    <ChevronLeft size={16} />
                    <ChevronRight size={16} />
                    <RotateCcw size={16} />
                </div>
                <div style={{
                    flex: 1,
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid var(--border-soft)'
                }}>
                    <Search size={12} />
                    {activeTab.displayUrl}
                </div>
            </div>

            {/* Content Area */}
            <div
                style={{ height: '450px', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => {
                    window.open(activeTab.redirectUrl, '_blank');
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab.id}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BrowserMock;

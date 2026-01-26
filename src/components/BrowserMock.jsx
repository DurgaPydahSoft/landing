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
        color: '#8B4513',
        bgColor: '#FAF3E0'
    },
    {
        id: 'hostel',
        name: 'Hostel CRM',
        displayUrl: 'hms.pydahsoft.in',
        redirectUrl: 'https://hms.pydahsoft.in',
        icon: Package,
        color: '#0ea5e9',
        bgColor: '#F0F9FF'
    },
    {
        id: 'hrms',
        name: 'Payroll & HRMS',
        displayUrl: 'hrms.pydahsoft.in',
        redirectUrl: 'https://hrms.pydahsoft.in',
        icon: CreditCard,
        color: '#10b981',
        bgColor: '#F0FDF4'
    },
    {
        id: 'inventory',
        name: 'Inventory System',
        displayUrl: 'inventory.pydahsoft.in',
        redirectUrl: 'https://pydah-pharmacy-labs.vercel.app',
        icon: PieChart,
        color: '#3B82F6',
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
                    <div className="bg-white h-full" style={{ padding: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                        <div className="flex justify-between items-center" style={{ marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                            <h3 className="font-semibold" style={{ color: theme, fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)' }}>Student Overview</h3>
                            <div className="rounded-full" style={{ 
                                background: activeTab.bgColor,
                                paddingLeft: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                paddingRight: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                paddingTop: 'clamp(0.375rem, 0.8vw, 0.5rem)',
                                paddingBottom: 'clamp(0.375rem, 0.8vw, 0.5rem)',
                                fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)'
                            }}>2025-26 Year</div>
                        </div>
                        <div className="grid grid-cols-3" style={{ gap: 'clamp(0.75rem, 1.8vw, 1rem)', marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-xl text-center" style={{ 
                                    border: `1px solid ${activeTab.bgColor}`,
                                    padding: 'clamp(0.875rem, 2vw, 1rem)'
                                }}>
                                    <div className="font-bold" style={{ color: theme, fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)' }}>{120 * i}</div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)', marginTop: 'clamp(0.25rem, 0.6vw, 0.375rem)' }}>{i === 1 ? 'Total' : i === 2 ? 'Courses' : 'Present'}</div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-xl opacity-50 flex items-center justify-center" style={{ 
                            background: activeTab.bgColor,
                            height: 'clamp(80px, 12vw, 100px)'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={theme} strokeWidth="1">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                    </div>
                );
            case 'inventory':
                return (
                    <div className="bg-white h-full" style={{ padding: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                        <div className="flex" style={{ gap: 'clamp(0.75rem, 1.8vw, 1rem)', marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                            <div className="flex-1 rounded-xl text-white" style={{ 
                                background: activeTab.theme || theme,
                                padding: 'clamp(0.875rem, 2vw, 1rem)'
                            }}>
                                <div className="opacity-80" style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)' }}>Pharmacy Stock</div>
                                <div className="font-bold" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.75rem)', marginTop: 'clamp(0.25rem, 0.6vw, 0.375rem)' }}>1,240</div>
                            </div>
                            <div className="flex-1 border rounded-xl" style={{ 
                                borderColor: 'var(--color-border-soft)',
                                padding: 'clamp(0.875rem, 2vw, 1rem)'
                            }}>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)' }}>Labs Supply</div>
                                <div className="font-bold" style={{ color: 'var(--color-text-main)', fontSize: 'clamp(1.5rem, 3.5vw, 1.75rem)', marginTop: 'clamp(0.25rem, 0.6vw, 0.375rem)' }}>86%</div>
                            </div>
                        </div>
                        <div className="flex flex-col" style={{ gap: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center rounded-lg border border-slate-100" style={{ 
                                    gap: 'clamp(0.75rem, 1.8vw, 1rem)',
                                    padding: 'clamp(0.625rem, 1.5vw, 0.75rem)'
                                }}>
                                    <div className="rounded-md flex-shrink-0" style={{ 
                                        width: 'clamp(2rem, 3vw, 2.25rem)',
                                        height: 'clamp(2rem, 3vw, 2.25rem)',
                                        background: activeTab.bgColor 
                                    }} />
                                    <div className="flex-1 rounded" style={{ height: 'clamp(0.5rem, 1vw, 0.625rem)', background: '#f1f5f9' }} />
                                    <div className="rounded opacity-60 flex-shrink-0" style={{ 
                                        width: 'clamp(2.5rem, 4vw, 3rem)',
                                        height: 'clamp(0.5rem, 1vw, 0.625rem)',
                                        background: theme 
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'hrms':
                return (
                    <div className="bg-white h-full" style={{ padding: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                        <div className="flex items-center" style={{ 
                            gap: 'clamp(0.75rem, 1.8vw, 1rem)',
                            marginBottom: 'clamp(1.5rem, 3.5vw, 2rem)'
                        }}>
                            <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                                width: 'clamp(2.75rem, 4vw, 3rem)',
                                height: 'clamp(2.75rem, 4vw, 3rem)',
                                background: activeTab.bgColor 
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme} strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 7a4 4 0 110-8 4 4 0 010 8z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold" style={{ 
                                    color: 'var(--color-text-main)',
                                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                                }}>HRMS Dashboard</div>
                                <div style={{ 
                                    color: 'var(--color-text-muted)',
                                    fontSize: 'clamp(0.6875rem, 1.3vw, 0.75rem)',
                                    marginTop: 'clamp(0.25rem, 0.6vw, 0.375rem)'
                                }}>152 Employees</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2" style={{ gap: 'clamp(0.75rem, 1.8vw, 1rem)' }}>
                            <div className="rounded-xl" style={{ 
                                background: activeTab.bgColor,
                                height: 'clamp(80px, 12vw, 100px)',
                                padding: 'clamp(0.875rem, 2vw, 1rem)'
                            }}>
                                <div className="rounded mb-2" style={{ 
                                    width: '40%',
                                    height: 'clamp(0.5rem, 1vw, 0.625rem)',
                                    background: theme 
                                }} />
                                <div className="w-full rounded" style={{ 
                                    height: 'clamp(0.25rem, 0.6vw, 0.375rem)',
                                    background: 'white' 
                                }} />
                            </div>
                            <div className="rounded-xl" style={{ 
                                background: activeTab.bgColor,
                                height: 'clamp(80px, 12vw, 100px)',
                                padding: 'clamp(0.875rem, 2vw, 1rem)'
                            }}>
                                <div className="rounded mb-2" style={{ 
                                    width: '40%',
                                    height: 'clamp(0.5rem, 1vw, 0.625rem)',
                                    background: theme 
                                }} />
                                <div className="w-full rounded" style={{ 
                                    height: 'clamp(0.25rem, 0.6vw, 0.375rem)',
                                    background: 'white' 
                                }} />
                            </div>
                        </div>
                    </div>
                );
            case 'hostel':
                return (
                    <div className="bg-white h-full" style={{ padding: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                        <div className="flex" style={{ 
                            height: 'clamp(60px, 10vw, 80px)',
                            gap: 'clamp(0.75rem, 1.8vw, 1rem)',
                            marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)'
                        }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex-1 rounded-lg flex items-center justify-center" style={{ background: activeTab.bgColor }}>
                                    <div className="rounded opacity-30" style={{ 
                                        width: '60%',
                                        height: 'clamp(0.25rem, 0.6vw, 0.375rem)',
                                        background: theme 
                                    }} />
                                </div>
                            ))}
                        </div>
                        <div className="rounded-xl border" style={{ 
                            borderColor: 'var(--color-border-soft)',
                            padding: 'clamp(0.875rem, 2vw, 1rem)'
                        }}>
                            <div className="flex justify-between" style={{ marginBottom: 'clamp(0.875rem, 2vw, 1rem)' }}>
                                <div className="rounded" style={{ 
                                    width: 'clamp(60px, 12vw, 100px)',
                                    height: 'clamp(0.5rem, 1vw, 0.625rem)',
                                    background: '#f1f5f9' 
                                }} />
                                <div className="rounded" style={{ 
                                    width: 'clamp(2.5rem, 4vw, 3rem)',
                                    height: 'clamp(0.5rem, 1vw, 0.625rem)',
                                    background: activeTab.bgColor 
                                }} />
                            </div>
                            <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 1.2vw, 0.625rem)' }}>
                                {[1, 2].map(i => (
                                    <div key={i} className="rounded-md bg-slate-50 border border-slate-100" style={{ 
                                        height: 'clamp(2rem, 3vw, 2.25rem)'
                                    }} />
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
        <div className="browser-mock w-full max-w-[900px] rounded-[clamp(12px,3vw,20px)] overflow-hidden relative mx-auto" style={{ boxShadow: 'var(--shadow-glass)', backgroundColor: 'var(--color-bg-white)', border: '1px solid var(--color-border-soft)' }}>
            {/* Window Controls (Traffic Lights) */}
            <div className="bg-slate-100 flex items-center border-b" style={{ 
                borderColor: 'var(--color-border-soft)',
                paddingTop: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                paddingBottom: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                paddingLeft: 'clamp(0.75rem, 1.8vw, 1rem)',
                paddingRight: 'clamp(0.75rem, 1.8vw, 1rem)',
                gap: 'clamp(0.5rem, 1.2vw, 0.625rem)'
            }}>
                <div className="flex" style={{ gap: 'clamp(0.375rem, 0.8vw, 0.5rem)' }}>
                    <div className="rounded-full bg-[#ff5f56] flex-shrink-0" style={{ 
                        width: 'clamp(10px, 2vw, 12px)',
                        height: 'clamp(10px, 2vw, 12px)'
                    }} />
                    <div className="rounded-full bg-[#ffbd2e] flex-shrink-0" style={{ 
                        width: 'clamp(10px, 2vw, 12px)',
                        height: 'clamp(10px, 2vw, 12px)'
                    }} />
                    <div className="rounded-full bg-[#27c93f] flex-shrink-0" style={{ 
                        width: 'clamp(10px, 2vw, 12px)',
                        height: 'clamp(10px, 2vw, 12px)'
                    }} />
                </div>
            </div>

            {/* Tab Bar */}
            <div className="bg-slate-50 flex border-b overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch]" style={{ 
                borderColor: 'var(--color-border-soft)',
                paddingTop: 'clamp(0.25rem, 0.6vw, 0.375rem)',
                paddingLeft: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                paddingRight: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                gap: 'clamp(0.25rem, 0.6vw, 0.375rem)'
            }}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab.id === tab.id;
                    return (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                rounded-t-[10px] cursor-pointer flex items-center transition-all duration-200 flex-shrink-0 whitespace-nowrap -mb-px
                                ${isActive ? 'bg-white font-bold border border-b-transparent' : 'bg-transparent font-medium border border-transparent'}
                            `}
                            style={{
                                paddingTop: 'clamp(0.375rem, 0.9vw, 0.5rem)',
                                paddingBottom: 'clamp(0.375rem, 0.9vw, 0.5rem)',
                                paddingLeft: 'clamp(0.625rem, 1.5vw, 1rem)',
                                paddingRight: 'clamp(0.625rem, 1.5vw, 1rem)',
                                gap: 'clamp(0.375rem, 0.9vw, 0.5rem)',
                                fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)',
                                minWidth: 'clamp(100px, 20vw, 130px)',
                                ...(isActive ? { color: 'var(--color-text-main)', borderColor: 'var(--color-border-soft)' } : { color: 'var(--color-text-muted)', borderColor: 'transparent' })
                            }}
                        >
                            <Icon size={14} color={tab.color} />
                            <span className="tab-name">{tab.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Address Bar */}
            <div className="bg-white flex items-center border-b flex-wrap" style={{ 
                borderColor: 'var(--color-border-soft)',
                paddingTop: 'clamp(0.5rem, 1.2vw, 0.625rem)',
                paddingBottom: 'clamp(0.5rem, 1.2vw, 0.625rem)',
                paddingLeft: 'clamp(0.75rem, 1.8vw, 1rem)',
                paddingRight: 'clamp(0.75rem, 1.8vw, 1rem)',
                gap: 'clamp(0.5rem, 1.2vw, 0.75rem)'
            }}>
                <div className="browser-controls flex" style={{ 
                    color: 'var(--color-text-muted)',
                    gap: 'clamp(0.375rem, 0.9vw, 0.5rem)'
                }}>
                    <ChevronLeft size={16} />
                    <ChevronRight size={16} />
                    <RotateCcw size={16} />
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg flex items-center border overflow-hidden" style={{ 
                    color: 'var(--color-text-muted)',
                    borderColor: 'var(--color-border-soft)',
                    minWidth: 'clamp(200px, 30vw, 250px)',
                    paddingTop: 'clamp(0.25rem, 0.6vw, 0.375rem)',
                    paddingBottom: 'clamp(0.25rem, 0.6vw, 0.375rem)',
                    paddingLeft: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                    paddingRight: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                    gap: 'clamp(0.375rem, 0.9vw, 0.5rem)',
                    fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)'
                }}>
                    <Search size={12} />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {activeTab.displayUrl}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="browser-content h-[clamp(300px,50vw,450px)] relative cursor-pointer overflow-hidden"
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
                        className="absolute w-full h-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <style>{`
                .browser-mock .tab-name {
                    display: inline;
                }
                @media (max-width: 480px) {
                    .browser-mock .tab-name {
                        display: none;
                    }
                    .browser-controls {
                        display: none !important;
                    }
                }
                .browser-mock::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default BrowserMock;

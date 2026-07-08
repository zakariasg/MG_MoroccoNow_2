export default function StatsSection({ stats }) {
    const items = [
        { label: 'Companies Supported', value: stats.companies, icon: '/images/icons/stats/management.png' },
        { label: 'Jobs In 2023', value: stats.jobs, icon: '/images/icons/stats/businessman.png' },
        { label: 'Of SMEs', value: stats.smes, icon: '/images/icons/stats/sme.png' },
        { label: 'Partners', value: stats.partners, icon: '/images/icons/stats/deal.png' },
    ];

    return (
        <div className="relative -mt-16 z-20 px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl py-10 px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {items.map((item, i) => (
                        <div key={i}>
                            <p className="text-emerald-600 font-semibold uppercase text-sm mb-2">
                                {item.label}
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-4xl font-bold text-[#001216]">{item.value}</span>
                                <img src={item.icon} alt="" className="w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
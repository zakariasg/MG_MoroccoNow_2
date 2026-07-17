export default function StatsSection({ stats }) {
    const items = [
        {
            label: 'Companies Supported',
            value: stats?.companies ?? 10,
            icon: '/images/stats/management.png',
        },
        {
            label: 'Jobs In 2023',
            value: stats?.jobs ?? 830,
            icon: '/images/stats/businessman.png',
        },
        {
            label: 'Of SMEs',
            value: stats?.smes ?? 75,
            icon: '/images/stats/sme.png',
        },
        {
            label: 'Partners',
            value: stats?.partners ?? 10,
            icon: '/images/stats/deal.png',
        },
    ];

    return (
        <section className="flex justify-center -mt-20 relative z-10 px-4">
            <div className="bg-white rounded-[3rem] shadow-xl w-full max-w-6xl px-8 md:px-16 py-10 md:py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center text-center px-4 ${
                                i !== 0 ? 'md:border-l md:border-gray-200' : ''
                            }`}
                        >
                            <div className="text-[#00A88F] font-semibold text-sm md:text-base uppercase tracking-wide mb-4">
                                {item.label}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                    {item.value}
                                </span>
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="h-12 w-12 md:h-16 md:w-16 object-contain flex-shrink-0"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
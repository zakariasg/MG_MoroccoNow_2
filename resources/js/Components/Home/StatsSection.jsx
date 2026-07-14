export default function StatsSection({ stats }) {
    const items = [
        { label: 'Companies Supported', value: stats?.companies ?? 10 },
        { label: 'Jobs In 2023', value: stats?.jobs ?? 830 },
        { label: 'SMEs', value: stats?.smes ?? 75 },
        { label: 'Partners', value: stats?.partners ?? 10 },
    ];

    return (
        <section className="flex justify-center -mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-lg px-10 py-6 flex gap-10">
                {items.map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
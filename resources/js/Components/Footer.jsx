export default function Footer() {
    const columns = [
        {
            title: 'About Us',
            links: ['Terms Of Service', 'Privacy Policy', 'FAQ', 'Contact us'],
        },
        {
            title: 'Why Morocco',
            links: ['Top Reasons To Invest', 'Economic Overview', 'Investment Opportunities', 'Government Support'],
        },
        {
            title: 'Sectors',
            links: ['Agriculture', 'Tourism', 'Renewable Energy', 'Manufacturing'],
        },
        {
            title: 'Invest Guide',
            links: ['How To Invest', 'Legal Framework', 'Tax Incentives', 'Investment Process'],
        },
        {
            title: 'News',
            links: ['Latest News', 'Press Releases', 'Events', 'Media Gallery'],
        },
    ];

    return (
        <footer className="bg-[#001216] text-white pt-16 pb-8 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
                {columns.map((col, i) => (
                    <div key={i}>
                        <h4 className="text-emerald-400 uppercase text-sm font-semibold mb-4">
                            // {col.title}
                        </h4>
                        <ul className="flex flex-col gap-2">
                            {col.links.map((link, j) => (
                                <li key={j} className="text-sm text-white/70 hover:text-white cursor-pointer">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/10 gap-4 text-xs text-white/50">
                <span>MOROCCO NOW</span>
                <span>© 2026 - Moroccan Investment and Export Agency</span>
                <span>AMDIE</span>
            </div>
        </footer>
    );
}
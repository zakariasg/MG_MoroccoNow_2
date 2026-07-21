import GuestLayout from '@/Layouts/GuestLayout';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function News({ news }) {
    return (
        <GuestLayout>
            {/* Hero banner - same visual theme as the homepage and Events page */}
            <section className="relative h-[420px] overflow-hidden">
                <img
                    src="/images/Hero/slider1.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
                    <h1 className="text-white text-4xl md:text-6xl font-bold">
                        Latest News
                    </h1>
                </div>
            </section>

            {/* News grid */}
            <section className="py-16 px-4">
                <div className="mx-auto max-w-6xl">
                    {news.length === 0 ? (
                        <p className="text-center text-gray-500">No news published at the moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((article) => (
                                <div
                                    key={article.id}
                                    className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition"
                                >
                                    {article.image_path ? (
                                        <img src={article.image_path} alt={article.title} className="h-48 w-full object-cover" />
                                    ) : (
                                        <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                                            Morocco Now News
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <p className="text-sm text-emerald-600 font-semibold mb-2">
                                            {formatDate(article.published_at)}
                                        </p>
                                        <h3 className="font-bold text-gray-900 text-xl mb-4">{article.title}</h3>
                                        {article.summary && (
                                            <p className="text-gray-700 mb-6 line-clamp-3">{article.summary}</p>
                                        )}

                                        <div className="mt-auto">
                                            <a
                                                href={route('news.show', article.slug)}
                                                className="inline-block px-6 py-2.5 rounded-lg bg-[#001a3d] text-white text-sm font-semibold hover:bg-[#00234f] transition"
                                            >
                                                Read more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
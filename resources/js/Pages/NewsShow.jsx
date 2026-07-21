import GuestLayout from '@/Layouts/GuestLayout';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function NewsShow({ article }) {
    return (
        <GuestLayout>
            <section className="relative h-[320px] overflow-hidden">
                {article.image_path ? (
                    <img
                        src={article.image_path}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#001216]" />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                    <p className="text-emerald-400 font-semibold mb-3">{formatDate(article.published_at)}</p>
                    <h1 className="text-white text-3xl md:text-5xl font-bold max-w-4xl">{article.title}</h1>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="mx-auto max-w-3xl">
                    {article.summary && (
                        <p className="text-lg text-gray-600 font-medium mb-8">{article.summary}</p>
                    )}
                    <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">
                        {article.content}
                    </div>

                    <div className="mt-12">
                        <a
                            href={route('news.index')}
                            className="inline-block px-6 py-2.5 rounded-lg bg-[#001a3d] text-white text-sm font-semibold hover:bg-[#00234f] transition"
                        >
                            ← Back to News
                        </a>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
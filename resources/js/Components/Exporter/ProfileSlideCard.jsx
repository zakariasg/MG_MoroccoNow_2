import { useEffect, useState } from 'react';

export default function ProfileSlideCard({ title, year, slides = [], documentPath }) {
    const [index, setIndex] = useState(0);
    const hasSlides = slides && slides.length > 0;

    useEffect(() => {
        if (!hasSlides || slides.length < 2) return;
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [hasSlides, slides.length]);

    const CardInner = (
        <div className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition cursor-pointer">
            <div className="relative h-40 w-full bg-gray-900 overflow-hidden">
                {hasSlides ? (
                    slides.map((src, i) => (
                        <img
                            key={src + i}
                            src={src}
                            alt={title}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                                i === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xs font-semibold">
                        Aucune image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 left-4 text-white/70 text-[11px] uppercase tracking-wider font-semibold">
                    Profil
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white text-lg font-bold leading-tight">
                    {title}
                </div>
                {year && (
                    <div className="absolute bottom-3 right-4 text-white/60 text-xs">{year}</div>
                )}
            </div>
        </div>
    );

    if (documentPath) {
        return (
            <a href={documentPath} target="_blank" rel="noopener noreferrer">
                {CardInner}
            </a>
        );
    }

    return CardInner;
}

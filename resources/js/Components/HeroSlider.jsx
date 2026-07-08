import { useState, useEffect } from 'react';

const slides = [
    {
        image: '/images/hero/hero-1.jpg',
        title: ['INVEST IN MOROCCO', 'AND EXPORT TO', 'THE WORLD'],
    },
    {
        image: '/images/hero/hero-2.jpg',
        title: ['INVEST IN MOROCCO', 'AND EXPORT TO', 'THE WORLD'],
    },
    {
        image: '/images/hero/hero-3.jpg',
        title: ['INVEST IN MOROCCO', 'AND EXPORT TO', 'THE WORLD'],
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const goToPrev = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className="relative h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="relative z-10 h-full flex items-center px-16">
                        <div>
                            <div className="text-white text-6xl font-black mb-4">"</div>
                            {slide.title.map((line, i) => (
                                <h1 key={i} className="text-white text-5xl font-extrabold uppercase leading-tight">
                                    {line}
                                </h1>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* Flèche précédente */}
            <button
                onClick={goToPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white text-4xl"
                aria-label="Précédent"
            >
                &#8249;
            </button>

            {/* Flèche suivante */}
            <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white text-4xl"
                aria-label="Suivant"
            >
                &#8250;
            </button>

            {/* Points de pagination */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1 rounded-full transition-all ${
                            index === current ? 'w-10 bg-emerald-400' : 'w-6 bg-white/50'
                        }`}
                        aria-label={`Aller à la diapositive ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
import { useState, useEffect } from 'react';

const defaultImages = [
    '/images/Hero/slider1.png',
    '/images/Hero/slider2.png',
    '/images/Hero/slider3.png',
];

export default function HeroSlider({ hero }) {
    const images = hero?.slides?.length ? hero.slides : defaultImages;
    const line1 = hero?.line1 || 'INVEST IN MOROCCO';
    const line2 = hero?.line2 || 'AND EXPORT TO';
    const line3 = hero?.line3 || 'THE WORLD';

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3500);

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative h-[600px] overflow-hidden">
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
                <h1 className="text-white text-3xl md:text-5xl font-bold uppercase leading-tight flex items-center justify-center gap-4">
                    <img
                        src="/images/shapes/union.svg"
                        alt="Union icon"
                        className="w-25 h-25 md:w-28 md:h-28 flex-shrink-0"
                    />
                    <span>
                        {line1}
                        <br />
                        {line2}
                        <br />
                        {line3}
                    </span>
                </h1>
            </div>
        </section>
    );
}

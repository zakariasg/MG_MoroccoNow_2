import { useState, useEffect } from 'react';

const images = [
    '/images/Hero/slider1.png',
    '/images/Hero/slider2.png',
    '/images/Hero/slider3.png',
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3500);

        return () => clearInterval(timer);
    }, []);

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
                <h1 className="text-white text-3xl md:text-5xl font-bold uppercase leading-tight">
                    INVEST IN MOROCCO
                    <br />
                    AND EXPORT TO THE WORLD
                </h1>
            </div>
        </section>
    );
}
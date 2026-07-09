export default function BusinessEnvironmentSection() {
    return (
        <section className="py-16 text-center px-8">
            <h2 className="text-2xl font-bold mb-8">
                REACH YOUR GOALS WITH A FAVORABLE BUSINESS ENVIRONMENT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-48 bg-gray-300 rounded flex items-center justify-center">
                        PRO BUSINESS
                    </div>
                ))}
            </div>
        </section>
    );
}
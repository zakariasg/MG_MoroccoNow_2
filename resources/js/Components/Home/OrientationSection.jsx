export default function OrientationSection() {
    return (
        <section className="py-16 text-center">
            <h2 className="text-2xl font-bold mb-8">CHOOSE YOUR ORIENTATION</h2>
            <div className="grid md:grid-cols-2">
                <div className="h-80 bg-emerald-800 flex items-center justify-center text-white text-xl font-semibold">
                    I'M INVESTOR
                </div>
                <div className="h-80 bg-emerald-900 flex items-center justify-center text-white text-xl font-semibold">
                    I'M EXPORTER
                </div>
            </div>
        </section>
    );
}
export default function VisionSection({ text }) {
    return (
        <section className="bg-black text-white py-20 px-8 text-center">
            <h2 className="text-xl font-semibold mb-4">
                {text || 'The Future Proof Industrial Platform To Capture Opportunities In A Changing World'}
            </h2>
        </section>
    );
}

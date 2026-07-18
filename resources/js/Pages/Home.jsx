import GuestLayout from '@/Layouts/GuestLayout';
import HeroSlider from '@/Components/Home/HeroSlider';
import StatsSection from '@/Components/Home/StatsSection';
import OrientationSection from '@/Components/Home/OrientationSection';
import MapSection from '@/Components/Home/MapSection';
import BusinessEnvironmentSection from '@/Components/Home/BusinessEnvironmentSection';
import HowWeHelpSection from '@/Components/Home/HowWeHelpSection';
import VisionSection from '@/Components/Home/VisionSection';

export default function Home({ stats, hero, visionText }) {
    return (
        <GuestLayout>
            <HeroSlider hero={hero} />
            <StatsSection stats={stats} />
            <OrientationSection />
            <MapSection />
            <BusinessEnvironmentSection />
            <HowWeHelpSection />
            <VisionSection text={visionText} />
        </GuestLayout>
    );
}

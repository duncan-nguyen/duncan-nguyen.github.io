import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import HeroSection from '@/components/sections/HeroSection';
import HonorsSection from '@/components/sections/HonorsSection';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ExpertiseSection />
            <HonorsSection />
        </main>
    );
}

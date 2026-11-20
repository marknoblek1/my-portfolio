import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { ProjectShowcase } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] =
    useState<ProjectShowcase | null>(null);
  const [contactContext, setContactContext] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#080809] text-white overflow-x-clip">
        <Navbar />

        <main>
          <HeroSection />
          <SelectedWorksSection
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </main>

      <Footer
        onOpenContact={(title) =>
          setContactContext(title || "Let's work together")
        }
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={(title) =>
          setContactContext(title || "Let's work together")
        }
      />

      <ContactModal
        isOpen={Boolean(contactContext)}
        contextTitle={contactContext || "Let's work together"}
        onClose={() => setContactContext(null)}
      />
      </div>
    </MotionConfig>
  );
}

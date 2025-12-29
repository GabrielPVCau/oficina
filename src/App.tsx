import { Navbar } from './components/Navbar';
import { HeroPhysics } from './components/HeroPhysics';
import { ProblemSection } from './components/ProblemSection';
import { GuideSection } from './components/GuideSection';
import { PlanSection } from './components/PlanSection';
import { SuccessSection } from './components/SuccessSection';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero with Physics */}
        <HeroPhysics />
        
        {/* StoryBrand Sections */}
        <ProblemSection />
        <GuideSection />
        <PlanSection />
        <SuccessSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}

export default App;

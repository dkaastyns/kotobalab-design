import { LandingNav } from "@/components/landing/landing-nav"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingAiTutor } from "@/components/landing/landing-ai-tutor"
import { LandingHighlights } from "@/components/landing/landing-highlights"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { LandingFaq } from "@/components/landing/landing-faq"
import { LandingFooter } from "@/components/landing/landing-footer"
import { ScrollFadeUp } from "@/components/shared/scroll-fade-up"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-background">
      <LandingNav />
      <main>
        <LandingHero />
        
        <ScrollFadeUp>
          <LandingFeatures />
        </ScrollFadeUp>
        
        <ScrollFadeUp>
          <LandingAiTutor />
        </ScrollFadeUp>
        
        <ScrollFadeUp>
          <LandingHighlights />
        </ScrollFadeUp>
        
        <ScrollFadeUp>
          <LandingTestimonials />
        </ScrollFadeUp>
        
        <ScrollFadeUp>
          <LandingFaq />
        </ScrollFadeUp>
      </main>
      <LandingFooter />
    </div>
  )
}

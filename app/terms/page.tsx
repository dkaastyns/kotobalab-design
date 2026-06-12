import Link from "next/link"
import { ArrowLeft, Scale } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function TermsPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="size-4" /> Back to home
          </Link>

          <div className="flex flex-col gap-4 border-b border-primary/5 pb-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Scale className="size-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: June 12, 2026</p>
          </div>

          <div className="mt-8 prose prose-gray dark:prose-invert max-w-none flex flex-col gap-6 text-muted-foreground/90 leading-relaxed text-sm">
            <p>
              Welcome to KotobaLab. By accessing or using our website, application, or services, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">1. Account Registration</h2>
            <p>
              To access the learning platform features, you must create a KotobaLab account. You agree to provide accurate, current, and complete registration information and keep your credentials secure. You are responsible for all activities that occur under your account.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">2. Proper Use of AI Tutor</h2>
            <p>
              Our AI tutor is designed to assist you in JLPT and TOEFL preparation. You agree not to use the tutor to generate offensive content, spam, scrape API endpoints, or attempt to jailbreak the primary/fallback language models.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">3. Premium Subscriptions</h2>
            <p>
              We offer free access as well as Pro subscriptions. Pro plans are billed in advance on a recurring monthly or annual basis. You can cancel your subscription at any time. Refunds are handled in accordance with our billing policy.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">4. Limitation of Liability</h2>
            <p>
              KotobaLab is provided on an &ldquo;as is&rdquo; basis. While we strive to provide accurate language explanations and test simulations, we do not guarantee that using the platform will result in passing your JLPT or TOEFL exams.
            </p>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}

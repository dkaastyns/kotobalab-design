import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function PrivacyPage() {
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
              <Shield className="size-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: June 12, 2026</p>
          </div>

          <div className="mt-8 prose prose-gray dark:prose-invert max-w-none flex flex-col gap-6 text-muted-foreground/90 leading-relaxed text-sm">
            <p>
              At KotobaLab, we respect your privacy and are committed to protecting the personal data we hold about you. This Privacy Policy explains how we collect, use, and share information when you use our website, mobile application, and AI tutoring services.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when creating an account, updating your profile, completing daily challenges, or interacting with our AI tutor. This includes:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li><strong>Account Information:</strong> Display name, email address, password, and avatar image.</li>
              <li><strong>Study Metrics:</strong> Test scores, daily study time, flashcard progress, and level metrics.</li>
              <li><strong>AI Tutor Interactions:</strong> Chats, logs, and questions submitted to our tutoring system to improve responses.</li>
            </ul>

            <h2 className="text-lg font-bold text-foreground mt-4">2. How We Use Your Information</h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>To provide and maintain our language laboratory platform.</li>
              <li>To personalize your study goals and adjust question difficulties using spaced repetition.</li>
              <li>To answer questions and generate explanations using AI models.</li>
              <li>To track streaks, award achievements, and maintain study heatmaps.</li>
            </ul>

            <h2 className="text-lg font-bold text-foreground mt-4">3. Data Security</h2>
            <p>
              We use standard administrative and technical security measures (including secure SSL sockets and hashed credentials) to secure your personal data. However, please remember that no method of transmission over the Internet is 100% secure.
            </p>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}

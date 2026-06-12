import Link from "next/link"
import { ArrowLeft, Cookie } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function CookiesPage() {
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
              <Cookie className="size-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: June 12, 2026</p>
          </div>

          <div className="mt-8 prose prose-gray dark:prose-invert max-w-none flex flex-col gap-6 text-muted-foreground/90 leading-relaxed text-sm">
            <p>
              This Cookie Policy explains how KotobaLab uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control them.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">1. What are Cookies?</h2>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="text-lg font-bold text-foreground mt-4">2. Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our site (such as session preservation when logged in).</li>
              <li><strong>Performance &amp; Analytics Cookies:</strong> These cookies collect information used to help us understand how our platform is being used or how effective our marketing campaigns are.</li>
              <li><strong>Functional Cookies:</strong> These cookies allow us to remember your preferences (like preferred study language or daily goals).</li>
            </ul>

            <h2 className="text-lg font-bold text-foreground mt-4">3. Controlling Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}

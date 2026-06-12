import { AppTopbar } from "@/components/app-topbar"
import { AnalyticsContent } from "@/components/analytics/analytics-content"

export default function AnalyticsPage() {
  return (
    <>
      <AppTopbar title="Performance Analytics" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <AnalyticsContent />
      </main>
    </>
  )
}

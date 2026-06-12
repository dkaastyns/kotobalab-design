import { AppTopbar } from "@/components/app-topbar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { InsightsPanel } from "@/components/dashboard/insights-panel"

export default function DashboardPage() {
  return (
    <>
      <AppTopbar title="Dashboard" />
      <div className="flex flex-1">
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <DashboardContent />
        </main>
        <InsightsPanel />
      </div>
    </>
  )
}

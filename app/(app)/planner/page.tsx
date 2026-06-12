import { AppTopbar } from "@/components/app-topbar"
import { PlannerContent } from "@/components/planner/planner-content"

export default function PlannerPage() {
  return (
    <>
      <AppTopbar title="Study Planner" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <PlannerContent />
      </main>
    </>
  )
}

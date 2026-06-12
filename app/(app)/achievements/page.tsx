import { AppTopbar } from "@/components/app-topbar"
import { AchievementsContent } from "@/components/achievements/achievements-content"

export default function AchievementsPage() {
  return (
    <>
      <AppTopbar title="Achievements & Streaks" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <AchievementsContent />
      </main>
    </>
  )
}

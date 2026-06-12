import { AppTopbar } from "@/components/app-topbar"
import { TutorContent } from "@/components/tutor/tutor-content"

export default function TutorPage() {
  return (
    <>
      <AppTopbar title="AI Tutor" />
      <main className="min-w-0 flex-1 p-4 md:p-6 flex flex-col">
        <TutorContent />
      </main>
    </>
  )
}

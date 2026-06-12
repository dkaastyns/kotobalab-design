import { Suspense } from "react"
import { AppTopbar } from "@/components/app-topbar"
import { PracticeContent } from "@/components/practice/practice-content"

export default function PracticePage() {
  return (
    <>
      <AppTopbar title="Practice" />
      <main className="min-w-0 flex-1 p-4 md:p-6 flex flex-col">
        <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Loading practice...</div>}>
          <PracticeContent />
        </Suspense>
      </main>
    </>
  )
}

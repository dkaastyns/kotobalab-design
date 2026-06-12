import { Suspense } from "react"
import { AppTopbar } from "@/components/app-topbar"
import { ExamContent } from "@/components/exam/exam-content"

export default function ExamPage() {
  return (
    <>
      <AppTopbar title="Mock Exam" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Loading exam...</div>}>
          <ExamContent />
        </Suspense>
      </main>
    </>
  )
}

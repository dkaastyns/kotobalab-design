import { AppTopbar } from "@/components/app-topbar"
import { JlptContent } from "@/components/jlpt/jlpt-content"

export default function JlptPage() {
  return (
    <>
      <AppTopbar title="JLPT Preparation" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <JlptContent />
      </main>
    </>
  )
}


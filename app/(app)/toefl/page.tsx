import { AppTopbar } from "@/components/app-topbar"
import { ToeflContent } from "@/components/toefl/toefl-content"

export default function ToeflPage() {
  return (
    <>
      <AppTopbar title="TOEFL Preparation" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <ToeflContent />
      </main>
    </>
  )
}


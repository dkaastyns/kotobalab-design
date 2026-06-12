import { AppTopbar } from "@/components/app-topbar"
import { VocabularyContent } from "@/components/vocabulary/vocabulary-content"

export default function VocabularyPage() {
  return (
    <>
      <AppTopbar title="Vocabulary Dictionary" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <VocabularyContent />
      </main>
    </>
  )
}

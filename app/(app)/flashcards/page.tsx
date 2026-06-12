import { AppTopbar } from "@/components/app-topbar"
import { FlashcardsContent } from "@/components/flashcards/flashcards-content"

export default function FlashcardsPage() {
  return (
    <>
      <AppTopbar title="Flashcard Review" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <FlashcardsContent />
      </main>
    </>
  )
}

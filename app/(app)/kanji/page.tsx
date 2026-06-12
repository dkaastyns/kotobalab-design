import { AppTopbar } from "@/components/app-topbar"
import { KanjiContent } from "@/components/kanji/kanji-content"

export default function KanjiPage() {
  return (
    <>
      <AppTopbar title="Kanji Library" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <KanjiContent />
      </main>
    </>
  )
}

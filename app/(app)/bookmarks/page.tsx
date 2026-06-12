import { AppTopbar } from "@/components/app-topbar"
import { BookmarksContent } from "@/components/bookmarks/bookmarks-content"

export default function BookmarksPage() {
  return (
    <>
      <AppTopbar title="Bookmarks & Notes" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <BookmarksContent />
      </main>
    </>
  )
}

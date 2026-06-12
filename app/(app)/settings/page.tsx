import { AppTopbar } from "@/components/app-topbar"
import { SettingsContent } from "@/components/settings/settings-content"

export default function SettingsPage() {
  return (
    <>
      <AppTopbar title="Settings" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <SettingsContent />
      </main>
    </>
  )
}

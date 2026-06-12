import { AppTopbar } from "@/components/app-topbar"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  return (
    <>
      <AppTopbar title="My Profile" />
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <ProfileContent />
      </main>
    </>
  )
}

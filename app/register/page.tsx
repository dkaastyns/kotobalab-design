import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Start learning JLPT & TOEFL with AI today.">
      <RegisterForm />
    </AuthShell>
  )
}

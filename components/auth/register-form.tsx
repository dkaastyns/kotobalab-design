"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const router = useRouter()
  const [show, setShow] = useState(false)

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const nameInput = target.elements.namedItem("name") as HTMLInputElement
        const emailInput = target.elements.namedItem("email") as HTMLInputElement
        const name = nameInput?.value || "Guest User"
        const email = emailInput?.value || ""

        localStorage.setItem("user", JSON.stringify({
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
          initials: name.charAt(0).toUpperCase() || "G",
          level: "N5",
          joined: "June 2026",
          plan: "Free",
          streakDays: 1,
          bestStreak: 1,
          notifications: [
            { id: "1", title: "Welcome to KotobaLab!", description: "Start by trying out a daily practice or reading the JLPT guide.", time: "Just now", unread: true }
          ]
        }))

        router.push("/dashboard")
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full name</Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="name" placeholder="Aiko Tanaka" className="h-11 rounded-xl pl-9" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl pl-9" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="At least 8 characters"
            className="h-11 rounded-xl px-9"
            required
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <Button type="submit" size="lg" className="h-11 w-full text-base">
        Create account
      </Button>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        By signing up you agree to our{" "}
        <Link href="/terms" className="text-accent hover:underline">Terms</Link> and{" "}
        <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

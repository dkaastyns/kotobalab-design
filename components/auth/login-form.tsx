"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [show, setShow] = useState(false)

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const emailInput = target.elements.namedItem("email") as HTMLInputElement
        const email = emailInput?.value || ""

        if (email === "dikatzy@kotobalab.app") {
          localStorage.setItem("user", JSON.stringify({
            name: "Dikatzy",
            email: "dikatzy@kotobalab.app",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dikatzy",
            initials: "D",
            level: "N3",
            joined: "June 2026",
            plan: "Pro",
            streakDays: 5,
            bestStreak: 12,
            notifications: [
              { id: "1", title: "Daily streak active", description: "You are on a 5-day study streak. Keep going!", time: "10m ago", unread: true },
              { id: "2", title: "Welcome back, Dikatzy!", description: "Ready to continue your study streak?", time: "Just now", unread: true },
              { id: "3", title: "Achievement Unlocked!", description: "Sharp Mind badge has been added to your profile.", time: "1h ago", unread: true }
            ]
          }))
        } else {
          const namePart = email.split("@")[0]
          const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1)
          localStorage.setItem("user", JSON.stringify({
            name: capitalizedName || "Guest User",
            email: email,
            avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${capitalizedName}`,
            initials: capitalizedName.charAt(0) || "G",
            level: "N5",
            joined: "June 2026",
            plan: "Free",
            streakDays: 1,
            bestStreak: 1,
            notifications: [
              { id: "1", title: "Welcome to KotobaLab!", description: "Start by trying out a daily practice or reading the JLPT guide.", time: "Just now", unread: true }
            ]
          }))
        }

        router.push("/dashboard")
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl pl-9" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-sm font-medium text-accent hover:underline">
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="••••••••"
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
        Sign in
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="outline" size="lg" className="h-11 w-full text-base">
        Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to KotobaLab?{" "}
        <Link href="/register" className="font-medium text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}

"use client"

import { useState } from "react"
import { Settings, Save, Bell, User, Laptop, Moon, Sun, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dailyGoal } from "@/lib/mock-data"
import { useCurrentUser, UserSession } from "@/hooks/use-user"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SettingsFormProps {
  user: UserSession
  updateUser: (updated: Partial<UserSession>) => void
  toggleDarkMode: () => void
}

function SettingsForm({ user, updateUser, toggleDarkMode }: SettingsFormProps) {
  const [profileName, setProfileName] = useState(user.name)
  const [profileEmail, setProfileEmail] = useState(user.email)
  const [selectedGoal, setSelectedGoal] = useState<string>(String(dailyGoal.target))
  const [jlptTarget, setJlptTarget] = useState<string>(user.jlptTarget || "N4")
  const [dailyReminders, setDailyReminders] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)

  const handleSave = () => {
    updateUser({ name: profileName, email: profileEmail, jlptTarget })
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">

      {/* Account Profile Section */}
      <Card className="border-border bg-card shadow-soft rounded-2xl">
        <CardHeader className="flex-row items-center gap-2.5 pb-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <User className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Account Profile</CardTitle>
            <CardDescription className="text-xs">Update your public display information.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-2">
          <div className="grid gap-2">
            <Label htmlFor="display-name" className="text-xs font-semibold text-muted-foreground uppercase">
              Display Name
            </Label>
            <Input
              id="display-name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="rounded-xl border-border bg-background/50 h-10"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-address" className="text-xs font-semibold text-muted-foreground uppercase">
              Email Address
            </Label>
            <Input
              id="email-address"
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="rounded-xl border-border bg-background/50 h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Study Preferences Section */}
      <Card className="border-border bg-card shadow-soft rounded-2xl">
        <CardHeader className="flex-row items-center gap-2.5 pb-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Laptop className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Study Preferences</CardTitle>
            <CardDescription className="text-xs">Tailor your daily learning volume and goals.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-2">
          <div className="grid gap-2">
            <Label htmlFor="daily-target" className="text-xs font-semibold text-muted-foreground uppercase">
              Daily Study Target (Minutes)
            </Label>
            <Select value={selectedGoal} onValueChange={(val) => val && setSelectedGoal(val)}>
              <SelectTrigger id="daily-target" className="rounded-xl border-border bg-background/50 h-10 text-sm">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border bg-card">
                <SelectItem value="15">15 Minutes / day (Casual)</SelectItem>
                <SelectItem value="30">30 Minutes / day (Regular)</SelectItem>
                <SelectItem value="50">50 Minutes / day (Serious)</SelectItem>
                <SelectItem value="90">90 Minutes / day (Intense)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="jlpt-target" className="text-xs font-semibold text-muted-foreground uppercase">
              JLPT Target Level
            </Label>
            <div className="flex gap-2 flex-wrap">
              {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setJlptTarget(lvl)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold border transition-all",
                    jlptTarget === lvl
                      ? "bg-primary text-primary-foreground border-primary shadow-soft"
                      : "bg-background border-border/80 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Your JLPT dashboard will be tailored to this target level.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card className="border-border bg-card shadow-soft rounded-2xl">
        <CardHeader className="flex-row items-center gap-2.5 pb-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {user.darkMode ? <Moon className="size-4.5" /> : <Sun className="size-4.5" />}
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Appearance</CardTitle>
            <CardDescription className="text-xs">Customize the look and feel of KotobaLab.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-2">
          <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className={cn(
                "rounded-lg p-2 transition-colors",
                user.darkMode ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {user.darkMode ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Dark Mode</span>
                <span className="text-xs text-muted-foreground">
                  {user.darkMode ? "Switch to light theme" : "Switch to dark theme"}
                </span>
              </div>
            </div>
            <Switch
              checked={user.darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Toggles */}
      <Card className="border-border bg-card shadow-soft rounded-2xl">
        <CardHeader className="flex-row items-center gap-2.5 pb-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-warning/10 text-warning">
            <Bell className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">App Notifications</CardTitle>
            <CardDescription className="text-xs">Configure sound and streak alert popups.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Daily Study Reminder</span>
              <span className="text-xs text-muted-foreground">Receive push notification alerts to save your streak.</span>
            </div>
            <Switch checked={dailyReminders} onCheckedChange={setDailyReminders} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Correct/Wrong Audio Sound FX</span>
              <span className="text-xs text-muted-foreground">Play responsive chime sounds on practice choices.</span>
            </div>
            <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
          </div>
        </CardContent>
      </Card>

      {/* XP & Stats Summary */}
      <Card className="border-border bg-card shadow-soft rounded-2xl">
        <CardHeader className="flex-row items-center gap-2.5 pb-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <GraduationCap className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Your Progress</CardTitle>
            <CardDescription className="text-xs">Overview of your learning statistics.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          {[
            { label: "Total XP", value: user.xp?.toLocaleString() || "0" },
            { label: "Correct Answers", value: (user.totalCorrect || 0).toLocaleString() },
            { label: "Sessions Done", value: (user.sessionsCompleted || 0).toString() },
            { label: "Cards Reviewed", value: (user.flashcardsReviewed || 0).toString() },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5 rounded-xl bg-muted/40 p-3">
              <span className="text-lg font-bold">{stat.value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save button bar */}
      <div className="flex justify-end gap-3 pt-2">
        <Button onClick={handleSave} className="rounded-xl px-6 h-11 bg-primary text-primary-foreground hover:brightness-105 font-semibold transition-all">
          <Save className="size-4 mr-1.5" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

export function SettingsContent() {
  const { user, updateUser, toggleDarkMode } = useCurrentUser()

  return <SettingsForm user={user} updateUser={updateUser} toggleDarkMode={toggleDarkMode} key={user.email} />
}

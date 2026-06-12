"use client"

import { useState } from "react"
import { Settings, Save, Shield, Bell, User, Laptop } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dailyGoal } from "@/lib/mock-data"
import { useCurrentUser, UserSession } from "@/hooks/use-user"
import { toast } from "sonner"

interface SettingsFormProps {
  user: UserSession
  updateUser: (updated: Partial<UserSession>) => void
}

function SettingsForm({ user, updateUser }: SettingsFormProps) {
  const [profileName, setProfileName] = useState(user.name)
  const [profileEmail, setProfileEmail] = useState(user.email)
  const [selectedGoal, setSelectedGoal] = useState<string>(String(dailyGoal.target))
  const [dailyReminders, setDailyReminders] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)

  const handleSave = () => {
    updateUser({ name: profileName, email: profileEmail })
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      {/* Settings Sections */}
      <div className="flex flex-col gap-6">
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
              <CardDescription className="text-xs">Tailor your daily learning volume targets.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="daily-target" className="text-xs font-semibold text-muted-foreground uppercase">
                Daily Study Target (Minutes)
              </Label>
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
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

        {/* Save button bar */}
        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={handleSave} className="rounded-xl px-6 h-11 bg-primary text-primary-foreground hover:brightness-105 font-semibold transition-all">
            <Save className="size-4 mr-1.5" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}

export function SettingsContent() {
  const { user, updateUser } = useCurrentUser()

  return <SettingsForm user={user} updateUser={updateUser} key={user.email} />
}

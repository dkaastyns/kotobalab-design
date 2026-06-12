import { useState, useEffect } from "react"
import { user as mockUser } from "@/lib/mock-data"

export interface UserNotification {
  id: string
  title: string
  description: string
  time: string
  unread: boolean
}

export interface UserSession {
  name: string
  email: string
  avatar: string
  initials: string
  level: string
  joined: string
  plan: string
  streakDays: number
  bestStreak: number
  notifications: UserNotification[]
}

const defaultUser: UserSession = {
  ...mockUser,
  streakDays: 27,
  bestStreak: 41,
  notifications: [
    { id: "1", title: "Welcome to KotobaLab!", description: "Start by trying out a daily practice or reading the JLPT guide.", time: "1h ago", unread: true },
    { id: "2", title: "Study Goal Reminder", description: "You are close to completing your daily study goal today.", time: "4h ago", unread: true }
  ]
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserSession>(defaultUser)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentUser(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse stored user", e)
      }
    }
  }, [])

  const updateUser = (updated: Partial<UserSession>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updated }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const markNotificationsAsRead = () => {
    setCurrentUser((prev) => {
      const updatedNotifications = (prev.notifications || []).map(n => ({ ...n, unread: false }))
      const next = { ...prev, notifications: updatedNotifications }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const clearNotifications = () => {
    setCurrentUser((prev) => {
      const next = { ...prev, notifications: [] }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const addNotification = (title: string, description: string) => {
    setCurrentUser((prev) => {
      const newNotification: UserNotification = {
        id: String(Date.now()),
        title,
        description,
        time: "Just now",
        unread: true
      }
      const next = { ...prev, notifications: [newNotification, ...(prev.notifications || [])] }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const incrementStreak = () => {
    setCurrentUser((prev) => {
      const nextStreak = (prev.streakDays || 0) + 1
      const nextBest = Math.max(prev.bestStreak || 0, nextStreak)
      const next = { ...prev, streakDays: nextStreak, bestStreak: nextBest }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  return {
    user: currentUser,
    updateUser,
    markNotificationsAsRead,
    clearNotifications,
    addNotification,
    incrementStreak
  }
}

import { useState, useEffect } from "react"
import { user as mockUser } from "@/lib/mock-data"

export interface UserNotification {
  id: string
  title: string
  description: string
  time: string
  unread: boolean
}

export interface BookmarkItem {
  id: string
  type: "Vocabulary" | "Grammar" | "Kanji" | "Question" | "Reading"
  title: string
  level: string
  note?: string
  createdAt: string
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
  /** ISO date string "YYYY-MM-DD" — prevents multiple streak increments per day */
  streakLastUpdated: string | null
  notifications: UserNotification[]
  bookmarks: BookmarkItem[]
  darkMode: boolean
  jlptTarget: string
  xp: number
  totalCorrect: number
  sessionsCompleted: number
  flashcardsReviewed: number
  aiTutorSessions: number
}

const defaultUser: UserSession = {
  ...mockUser,
  streakDays: 27,
  bestStreak: 41,
  streakLastUpdated: null,
  notifications: [
    { id: "1", title: "Welcome to KotobaLab!", description: "Start by trying out a daily practice or reading the JLPT guide.", time: "1h ago", unread: true },
    { id: "2", title: "Study Goal Reminder", description: "You are close to completing your daily study goal today.", time: "4h ago", unread: true }
  ],
  bookmarks: [],
  darkMode: false,
  jlptTarget: "N4",
  xp: 1240,
  totalCorrect: 0,
  sessionsCompleted: 0,
  flashcardsReviewed: 0,
  aiTutorSessions: 0,
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0]
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserSession>(defaultUser)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
      const stored = localStorage.getItem("user")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          // Merge with defaults to ensure any new fields exist
          setCurrentUser({ ...defaultUser, ...parsed })
        } catch (e) {
          console.error("Failed to parse stored user", e)
        }
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Apply dark mode to <html> whenever preference changes
  useEffect(() => {
    if (!isMounted) return
    if (currentUser.darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [currentUser.darkMode, isMounted])

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

  /** Increment streak only once per calendar day */
  const incrementStreak = () => {
    setCurrentUser((prev) => {
      const today = getTodayString()
      if (prev.streakLastUpdated === today) {
        // Already incremented today, skip silently
        return prev
      }
      const nextStreak = (prev.streakDays || 0) + 1
      const nextBest = Math.max(prev.bestStreak || 0, nextStreak)
      const next = {
        ...prev,
        streakDays: nextStreak,
        bestStreak: nextBest,
        streakLastUpdated: today,
      }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const addXP = (amount: number) => {
    setCurrentUser((prev) => {
      const next = { ...prev, xp: (prev.xp || 0) + amount }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const recordCorrectAnswer = () => {
    setCurrentUser((prev) => {
      const next = { ...prev, totalCorrect: (prev.totalCorrect || 0) + 1 }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const completeSession = () => {
    setCurrentUser((prev) => {
      const next = { ...prev, sessionsCompleted: (prev.sessionsCompleted || 0) + 1 }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const recordFlashcardsReviewed = (count: number) => {
    setCurrentUser((prev) => {
      const next = { ...prev, flashcardsReviewed: (prev.flashcardsReviewed || 0) + count }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const recordAISession = () => {
    setCurrentUser((prev) => {
      const next = { ...prev, aiTutorSessions: (prev.aiTutorSessions || 0) + 1 }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  // ── Centralized Bookmark Management ──
  const addBookmark = (item: Omit<BookmarkItem, "id" | "createdAt">) => {
    setCurrentUser((prev) => {
      const already = (prev.bookmarks || []).some(
        b => b.title === item.title && b.type === item.type
      )
      if (already) return prev
      const newBookmark: BookmarkItem = {
        ...item,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
      }
      const next = { ...prev, bookmarks: [newBookmark, ...(prev.bookmarks || [])] }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const removeBookmark = (id: string) => {
    setCurrentUser((prev) => {
      const next = { ...prev, bookmarks: (prev.bookmarks || []).filter(b => b.id !== id) }
      localStorage.setItem("user", JSON.stringify(next))
      return next
    })
  }

  const isBookmarked = (title: string, type: BookmarkItem["type"]): boolean => {
    return (currentUser.bookmarks || []).some(b => b.title === title && b.type === type)
  }

  const toggleDarkMode = () => {
    updateUser({ darkMode: !currentUser.darkMode })
  }

  return {
    user: currentUser,
    isMounted,
    updateUser,
    markNotificationsAsRead,
    clearNotifications,
    addNotification,
    incrementStreak,
    addXP,
    recordCorrectAnswer,
    completeSession,
    recordFlashcardsReviewed,
    recordAISession,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleDarkMode,
  }
}

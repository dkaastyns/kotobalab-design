export type JlptLevel = "N5" | "N4" | "N3" | "N2"

export const user = {
  name: "Aiko Tanaka",
  email: "aiko@kotobalab.app",
  avatar: "/learner-avatar.png",
  initials: "AT",
  level: "N4",
  joined: "March 2025",
  plan: "Pro",
}

export const dailyGoal = {
  current: 38,
  target: 50,
  unit: "min",
}

export const streak = {
  days: 27,
  best: 41,
  // last 12 weeks of activity intensity 0-4
}

export const todaysChallenge = {
  title: "Grammar Sprint — て-form",
  description: "15 quick questions on the te-form conjugation.",
  questions: 15,
  xp: 120,
}

export const weeklyProgress = [
  { day: "Mon", minutes: 42, accuracy: 81 },
  { day: "Tue", minutes: 55, accuracy: 84 },
  { day: "Wed", minutes: 30, accuracy: 79 },
  { day: "Thu", minutes: 61, accuracy: 88 },
  { day: "Fri", minutes: 48, accuracy: 85 },
  { day: "Sat", minutes: 72, accuracy: 90 },
  { day: "Sun", minutes: 38, accuracy: 87 },
]

export const accuracyTrend = [
  { week: "W1", accuracy: 68 },
  { week: "W2", accuracy: 72 },
  { week: "W3", accuracy: 70 },
  { week: "W4", accuracy: 77 },
  { week: "W5", accuracy: 81 },
  { week: "W6", accuracy: 84 },
  { week: "W7", accuracy: 86 },
  { week: "W8", accuracy: 89 },
]

export const studyTimeTrend = [
  { week: "W1", hours: 4.2 },
  { week: "W2", hours: 5.1 },
  { week: "W3", hours: 3.8 },
  { week: "W4", hours: 6.0 },
  { week: "W5", hours: 5.6 },
  { week: "W6", hours: 7.1 },
  { week: "W7", hours: 6.4 },
  { week: "W8", hours: 7.8 },
]

export const topicPerformance = [
  { topic: "Vocabulary", score: 88 },
  { topic: "Grammar", score: 74 },
  { topic: "Reading", score: 69 },
  { topic: "Kanji", score: 81 },
  { topic: "Listening", score: 77 },
]

export const jlptReadiness = { level: "N4", percent: 72 }
export const toeflReadiness = { score: 92, target: 100 }

export const jlptLevels: {
  level: JlptLevel
  label: string
  progress: number
  vocabulary: number
  grammar: number
  reading: number
  kanji: number
  unlocked: boolean
}[] = [
  { level: "N5", label: "Beginner", progress: 100, vocabulary: 100, grammar: 100, reading: 98, kanji: 100, unlocked: true },
  { level: "N4", label: "Elementary", progress: 72, vocabulary: 88, grammar: 74, reading: 69, kanji: 81, unlocked: true },
  { level: "N3", label: "Intermediate", progress: 34, vocabulary: 41, grammar: 30, reading: 28, kanji: 38, unlocked: true },
  { level: "N2", label: "Upper Intermediate", progress: 8, vocabulary: 12, grammar: 6, reading: 5, kanji: 9, unlocked: false },
]

export const toeflSections = [
  { name: "Reading", score: 24, max: 30, progress: 80 },
  { name: "Listening", score: 23, max: 30, progress: 77 },
  { name: "Speaking", score: 22, max: 30, progress: 73 },
  { name: "Writing", score: 23, max: 30, progress: 77 },
]

export const recentActivities = [
  { id: 1, type: "practice", title: "Completed Grammar Practice N4", detail: "18 / 20 correct", time: "2h ago" },
  { id: 2, type: "flashcard", title: "Reviewed 40 flashcards", detail: "Vocabulary deck", time: "5h ago" },
  { id: 3, type: "exam", title: "Mock Exam N4 Reading", detail: "Score 84%", time: "Yesterday" },
  { id: 4, type: "tutor", title: "AI Tutor session", detail: "は vs が particles", time: "Yesterday" },
]

export const continueLearning = [
  { id: 1, title: "N4 Grammar — Conditionals", progress: 65, lessons: "13 / 20" },
  { id: 2, title: "Kanji Set 4 — Nature", progress: 40, lessons: "8 / 20" },
  { id: 3, title: "TOEFL Reading — Inference", progress: 25, lessons: "3 / 12" },
]

export const aiRecommendations = [
  { id: 1, title: "Review て-form exceptions", reason: "3 misses this week" },
  { id: 2, title: "Practice counters (枚, 本, 個)", reason: "Below 60% accuracy" },
  { id: 3, title: "TOEFL inference questions", reason: "Slow response time" },
]

export const weakAreas = [
  { area: "Reading comprehension", accuracy: 62 },
  { area: "Transitive verbs", accuracy: 58 },
  { area: "Listening — fast speech", accuracy: 64 },
]

export const upcomingGoals = [
  { id: 1, title: "Finish N4 Grammar", due: "In 9 days", progress: 74 },
  { id: 2, title: "TOEFL mock score 95+", due: "In 3 weeks", progress: 60 },
]

export const studyTips = [
  "Study in short focused blocks — 25 minutes beats 2 unfocused hours.",
  "Review yesterday's mistakes before starting new material.",
  "Read aloud to strengthen reading and listening together.",
]

export const vocabulary = [
  { id: 1, word: "勉強", reading: "べんきょう", meaning: "study", level: "N5", mastery: 92, bookmarked: true },
  { id: 2, word: "難しい", reading: "むずかしい", meaning: "difficult", level: "N5", mastery: 78, bookmarked: false },
  { id: 3, word: "経験", reading: "けいけん", meaning: "experience", level: "N4", mastery: 64, bookmarked: true },
  { id: 4, word: "影響", reading: "えいきょう", meaning: "influence", level: "N3", mastery: 41, bookmarked: false },
  { id: 5, word: "認める", reading: "みとめる", meaning: "to recognize, admit", level: "N3", mastery: 35, bookmarked: false },
  { id: 6, word: "提案", reading: "ていあん", meaning: "proposal", level: "N3", mastery: 52, bookmarked: true },
  { id: 7, word: "解決", reading: "かいけつ", meaning: "resolution", level: "N3", mastery: 47, bookmarked: false },
  { id: 8, word: "状況", reading: "じょうきょう", meaning: "situation", level: "N3", mastery: 58, bookmarked: false },
]

export const kanji = [
  { id: 1, char: "学", meaning: "study, learning", on: "ガク", kun: "まな(ぶ)", level: "N5", strokes: 8, mastery: 95 },
  { id: 2, char: "校", meaning: "school", on: "コウ", kun: "—", level: "N5", strokes: 10, mastery: 88 },
  { id: 3, char: "験", meaning: "test, verify", on: "ケン", kun: "—", level: "N4", strokes: 18, mastery: 62 },
  { id: 4, char: "案", meaning: "plan, idea", on: "アン", kun: "—", level: "N3", strokes: 10, mastery: 45 },
  { id: 5, char: "経", meaning: "pass through", on: "ケイ", kun: "へ(る)", level: "N4", strokes: 11, mastery: 58 },
  { id: 6, char: "影", meaning: "shadow", on: "エイ", kun: "かげ", level: "N3", strokes: 15, mastery: 33 },
  { id: 7, char: "認", meaning: "recognize", on: "ニン", kun: "みと(める)", level: "N3", strokes: 14, mastery: 40 },
  { id: 8, char: "況", meaning: "condition", on: "キョウ", kun: "—", level: "N3", strokes: 8, mastery: 51 },
]

export const flashcards = [
  { id: 1, front: "勉強", reading: "べんきょう", back: "study", example: "毎日日本語を勉強します。" },
  { id: 2, front: "経験", reading: "けいけん", back: "experience", example: "いい経験になりました。" },
  { id: 3, front: "影響", reading: "えいきょう", back: "influence, effect", example: "天気に影響されます。" },
  { id: 4, front: "提案", reading: "ていあん", back: "proposal, suggestion", example: "新しい提案があります。" },
  { id: 5, front: "解決", reading: "かいけつ", back: "solution, resolution", example: "問題を解決しました。" },
]

export const reviewQueue = { due: 24, new: 8, learning: 12 }

export const practiceQuestion = {
  number: 7,
  total: 20,
  level: "N4",
  difficulty: "Medium",
  prompt: "彼は毎朝コーヒーを＿＿＿飲みます。",
  instruction: "Choose the word that best fits the blank.",
  choices: [
    { id: "a", label: "ながら", text: "while" },
    { id: "b", label: "ために", text: "in order to" },
    { id: "c", label: "ように", text: "so that" },
    { id: "d", label: "まで", text: "until" },
  ],
  correct: "a",
  explanation:
    "「ながら」connects two simultaneous actions performed by the same subject. Here it means he drinks coffee while doing something each morning.",
  aiExplanation:
    "Think of ながら as the English '- while -ing'. It attaches to the verb stem (ます-stem): 飲みながら = 'while drinking'. The main clause action and the ながら action happen at the same time, and the ながら clause is always the secondary action.",
  relatedGrammar: ["Verb stem + ながら", "〜つつ (formal equivalent)"],
  relatedVocabulary: ["毎朝 (まいあさ) — every morning", "飲む (のむ) — to drink"],
  suggestedPractice: ["Simultaneous actions drill", "Verb stem conjugation set"],
}

export const examQuestions = Array.from({ length: 20 }, (_, i) => ({
  number: i + 1,
  prompt: "次の文の＿＿に入る最も適切なものを選びなさい。",
  choices: ["ながら", "ために", "ように", "まで"],
}))

export const chatSuggestions = [
  "Explain the difference between は and が",
  "Break down the kanji 影響",
  "Give me 5 example sentences with ながら",
  "Quiz me on N4 grammar",
]

export const sampleChat = [
  {
    role: "assistant" as const,
    content:
      "こんにちは, Aiko! I'm your KotobaLab tutor. Ask me anything about grammar, vocabulary, kanji, or reading — I'll explain it simply with examples.",
  },
  {
    role: "user" as const,
    content: "What's the difference between は and が?",
  },
  {
    role: "assistant" as const,
    content:
      "Great question! In short:\n\n• は (wa) marks the **topic** — what the sentence is about. It often implies contrast or shared knowledge.\n• が (ga) marks the **subject** — it introduces new information or emphasizes who/what does something.\n\nExample:\n猫は魚が好きです。 — 'As for cats, they like fish.' は sets the topic (cats), が marks what they like (fish).",
  },
]

export const planner = [
  { id: 1, day: "Monday", tasks: [{ t: "N4 Grammar lesson", done: true }, { t: "20 flashcards", done: true }] },
  { id: 2, day: "Tuesday", tasks: [{ t: "Reading practice", done: true }, { t: "Kanji set 4", done: false }] },
  { id: 3, day: "Wednesday", tasks: [{ t: "Mock listening test", done: false }, { t: "Vocabulary review", done: false }] },
  { id: 4, day: "Thursday", tasks: [{ t: "AI Tutor — particles", done: false }] },
  { id: 5, day: "Friday", tasks: [{ t: "TOEFL reading drill", done: false }, { t: "Weekly review", done: false }] },
]

export const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "Sparkles", unlocked: true, progress: 100 },
  { id: 2, title: "Week Warrior", description: "7-day study streak", icon: "Flame", unlocked: true, progress: 100 },
  { id: 3, title: "Vocabulary Master", description: "Master 500 words", icon: "BookOpen", unlocked: true, progress: 100 },
  { id: 4, title: "Kanji Climber", description: "Learn 200 kanji", icon: "Mountain", unlocked: false, progress: 64 },
  { id: 5, title: "Perfect Score", description: "100% on a mock exam", icon: "Trophy", unlocked: false, progress: 88 },
  { id: 6, title: "Marathon", description: "30-day study streak", icon: "Calendar", unlocked: false, progress: 90 },
  { id: 7, title: "Night Owl", description: "Study after midnight 10 times", icon: "Moon", unlocked: true, progress: 100 },
  { id: 8, title: "Polyglot Path", description: "Reach N2 readiness", icon: "Languages", unlocked: false, progress: 8 },
]

export const bookmarks = [
  { id: 1, type: "Grammar", title: "〜ながら (simultaneous actions)", level: "N4", note: "Verb stem + ながら" },
  { id: 2, type: "Vocabulary", title: "影響 (えいきょう) — influence", level: "N3", note: "Often used with を受ける" },
  { id: 3, type: "Kanji", title: "験 — test, verify", level: "N4", note: "18 strokes, appears in 経験" },
  { id: 4, type: "Question", title: "Conditional 〜たら vs 〜ば", level: "N4", note: "Missed twice — review" },
  { id: 5, type: "Reading", title: "Inference passage — climate", level: "N3", note: "Practice main-idea questions" },
]

// 17 weeks x 7 days heatmap intensity
export const heatmap: number[][] = Array.from({ length: 17 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const seed = (w * 7 + d) * 53
    return Math.floor((Math.sin(seed) + 1) * 2.4) % 5
  }),
)

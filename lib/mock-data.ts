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

export const jlptLevels = [
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
  { id: 9, word: "準備", reading: "じゅんび", meaning: "preparation", level: "N4", mastery: 85, bookmarked: false },
  { id: 10, word: "理解", reading: "りかい", meaning: "understanding", level: "N3", mastery: 45, bookmarked: true },
  { id: 11, word: "興味", reading: "きょうみ", meaning: "interest", level: "N4", mastery: 72, bookmarked: false },
  { id: 12, word: "目的", reading: "もくてき", meaning: "purpose, goal", level: "N3", mastery: 60, bookmarked: false },
  { id: 13, word: "約束", reading: "やくそく", meaning: "promise, appointment", level: "N5", mastery: 95, bookmarked: false },
  { id: 14, word: "情報", reading: "じょうほう", meaning: "information", level: "N3", mastery: 50, bookmarked: true },
  { id: 15, word: "複雑", reading: "ふくざつ", meaning: "complex, complicated", level: "N3", mastery: 30, bookmarked: true },
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
  { id: 9, char: "語", meaning: "language, word", on: "ゴ", kun: "かた(る)", level: "N5", strokes: 14, mastery: 92 },
  { id: 10, char: "読", meaning: "read", on: "ドク", kun: "よ(む)", level: "N5", strokes: 14, mastery: 89 },
  { id: 11, char: "書", meaning: "write", on: "ショ", kun: "か(く)", level: "N5", strokes: 10, mastery: 85 },
  { id: 12, char: "聞", meaning: "hear, ask", on: "ブン", kun: "き(く)", level: "N5", strokes: 14, mastery: 94 },
  { id: 13, char: "話", meaning: "speak, talk", on: "ワ", kun: "はな(す)", level: "N5", strokes: 13, mastery: 91 },
  { id: 14, char: "買", meaning: "buy", on: "バイ", kun: "か(う)", level: "N5", strokes: 12, mastery: 87 },
  { id: 15, char: "行", meaning: "go, conduct", on: "コウ, ギョウ", kun: "い(く), おこな(う)", level: "N5", strokes: 6, mastery: 96 },
]

export const flashcards = [
  { id: 1, front: "勉強", reading: "べんきょう", back: "study", example: "毎日日本語を勉強します。", deck: "Vocabulary" },
  { id: 2, front: "経験", reading: "けいけん", back: "experience", example: "いい経験になりました。", deck: "Vocabulary" },
  { id: 3, front: "影響", reading: "えいきょう", back: "influence, effect", example: "天気に影響されます。", deck: "Vocabulary" },
  { id: 4, front: "提案", reading: "ていあん", back: "proposal, suggestion", example: "新しい提案があります。", deck: "Vocabulary" },
  { id: 5, front: "解決", reading: "かいけつ", back: "solution, resolution", example: "問題を解決しました。", deck: "Vocabulary" },
  { id: 6, front: "準備", reading: "じゅんび", back: "preparation", example: "テストの準備をしています。", deck: "Vocabulary" },
  { id: 7, front: "理解", reading: "りかい", back: "understanding", example: "先生の説明を理解しました。", deck: "Vocabulary" },
  { id: 8, front: "興味", reading: "きょうみ", back: "interest", example: "日本の文化に興味があります。", deck: "Vocabulary" },
  { id: 9, front: "目的", reading: "もくてき", back: "purpose, goal", example: "日本へ行く目的は何ですか。", deck: "Vocabulary" },
  { id: 10, front: "約束", reading: "やくそく", back: "promise, appointment", example: "友達と約束があります。", deck: "Vocabulary" },
  
  { id: 11, front: "〜ながら", reading: "〜ながら", back: "while ~ing", example: "音楽を聞きながら勉強します。", deck: "Grammar" },
  { id: 12, front: "〜ために", reading: "〜ために", back: "in order to, for the sake of", example: "健康のために野菜を食べます。", deck: "Grammar" },
  { id: 13, front: "〜ように", reading: "〜ように", back: "so that, in such a way that", example: "忘れないようにメモをします。", deck: "Grammar" },
  { id: 14, front: "〜たら", reading: "〜たら", back: "if, when, after", example: "雨が降ったら、行きません。", deck: "Grammar" },
  { id: 15, front: "〜ば", reading: "〜ば", back: "if (conditional)", example: "安ければ、買います。", deck: "Grammar" },

  { id: 16, front: "学", reading: "ガク / まな(ぶ)", back: "study, learning", example: "学校 (がっこう) - school", deck: "Kanji" },
  { id: 17, front: "読", reading: "ドク / よ(む)", back: "read", example: "読書 (どくしょ) - reading", deck: "Kanji" },
  { id: 18, front: "書", reading: "ショ / か(く)", back: "write", example: "辞書 (じしょ) - dictionary", deck: "Kanji" },
  { id: 19, front: "聞", reading: "ブン / き(く)", back: "hear, ask", example: "新聞 (しんぶん) - newspaper", deck: "Kanji" },
  { id: 20, front: "話", reading: "ワ / はな(す)", back: "speak, talk", example: "会話 (かいわ) - conversation", deck: "Kanji" },
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
  "Jelaskan perbedaan antara は dan が",
  "Uraikan kanji 影響 secara detail",
  "Berikan 5 contoh kalimat dengan ながら",
  "Uji pemahamanku tentang tata bahasa N4",
  "Apa perbedaan て-form dan た-form?",
  "Bantu saya memahami partikel に vs で",
]

export const sampleChat = [
  {
    role: "assistant" as const,
    content:
      "こんにちは, Aiko! I'm your KotobaLab tutor. Ask me anything about grammar, vocabulary, kanji, or reading — I'll explain it simply with examples.",
  },
]

export const planner = [
  { id: 1, day: "Monday", tasks: [{ t: "N4 Grammar lesson", done: true, category: "grammar", timeMinutes: 30 }, { t: "20 flashcards", done: true, category: "review", timeMinutes: 15 }] },
  { id: 2, day: "Tuesday", tasks: [{ t: "Reading practice", done: true, category: "reading", timeMinutes: 45 }, { t: "Kanji set 4", done: false, category: "kanji", timeMinutes: 20 }] },
  { id: 3, day: "Wednesday", tasks: [{ t: "Mock listening test", done: false, category: "listening", timeMinutes: 40 }, { t: "Vocabulary review", done: false, category: "vocabulary", timeMinutes: 20 }] },
  { id: 4, day: "Thursday", tasks: [{ t: "AI Tutor — particles", done: false, category: "grammar", timeMinutes: 30 }, { t: "Kanji Writing practice", done: false, category: "kanji", timeMinutes: 15 }] },
  { id: 5, day: "Friday", tasks: [{ t: "TOEFL reading drill", done: false, category: "reading", timeMinutes: 60 }, { t: "Weekly review", done: false, category: "review", timeMinutes: 30 }] },
  { id: 6, day: "Saturday", tasks: [{ t: "Mock Exam Section 1", done: false, category: "exam", timeMinutes: 60 }] },
  { id: 7, day: "Sunday", tasks: [{ t: "Rest & Light Flashcards", done: false, category: "review", timeMinutes: 15 }] },
]

export const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "Sparkles", unlocked: true, progress: 100, xpReward: 50 },
  { id: 2, title: "Week Warrior", description: "7-day study streak", icon: "Flame", unlocked: true, progress: 100, xpReward: 100 },
  { id: 3, title: "Vocabulary Master", description: "Master 500 words", icon: "BookOpen", unlocked: true, progress: 100, xpReward: 250 },
  { id: 4, title: "Kanji Climber", description: "Learn 200 kanji", icon: "Mountain", unlocked: false, progress: 64, xpReward: 300 },
  { id: 5, title: "Perfect Score", description: "100% on a mock exam", icon: "Trophy", unlocked: false, progress: 88, xpReward: 500 },
  { id: 6, title: "Marathon", description: "30-day study streak", icon: "Calendar", unlocked: false, progress: 90, xpReward: 400 },
  { id: 7, title: "Night Owl", description: "Study after midnight 10 times", icon: "Moon", unlocked: true, progress: 100, xpReward: 150 },
  { id: 8, title: "Polyglot Path", description: "Reach N2 readiness", icon: "Languages", unlocked: false, progress: 8, xpReward: 1000 },
]

export const bookmarks = [
  { id: 1, type: "Grammar", title: "〜ながら (simultaneous actions)", level: "N4", note: "Verb stem + ながら" },
  { id: 2, type: "Vocabulary", title: "影響 (えいきょう) — influence", level: "N3", note: "Often used with を受ける" },
  { id: 3, type: "Kanji", title: "験 — test, verify", level: "N4", note: "18 strokes, appears in 経験" },
  { id: 4, type: "Question", title: "Conditional 〜たら vs 〜ば", level: "N4", note: "Missed twice — review" },
  { id: 5, type: "Reading", title: "Inference passage — climate", level: "N3", note: "Practice main-idea questions" },
]

export const heatmap: number[][] = Array.from({ length: 17 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const seed = (w * 7 + d) * 53
    return Math.floor((Math.sin(seed) + 1) * 2.4) % 5
  }),
)

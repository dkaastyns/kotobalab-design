# 🌸 KotobaLab (言葉ラボ)

KotobaLab is a next-generation, AI-powered Japanese language learning platform designed to help students master JLPT (Japanese Language Proficiency Test) levels N5 through N1. By combining real-time dictionary APIs with the power of Large Language Models, KotobaLab offers an infinitely generating, highly personalized study experience.

## ✨ Core Features

- **🎯 Infinite Dynamic Practice & Mock Exams:** Never take the same test twice. The platform uses AI to generate unique grammar, vocabulary, and reading comprehension questions on-the-fly, tailored to your chosen JLPT level and weak areas.
- **📚 Hybrid AI Dictionary & Kanji Library:** Integrates directly with the massive Jisho.org API for instant, accurate search results across 190,000+ words. Click **"Ask AI to Explain"** on any word or Kanji to instantly generate custom example sentences, grammar usage notes, and clever memory tricks (Mnemonics).
- **⚙️ Custom Study Sessions:** Take full control of your learning. Customize your sessions by selecting your focus material (e.g., N4, Grammar, Kanji), the exact number of questions (from quick 3-question bursts to 20-question marathons), and toggle countdown timers for real exam pressure.
- **🤖 Interactive AI Tutor:** Got a question wrong? The AI Tutor acts as your personal sensei, breaking down the nuance of your mistakes and offering deeper explanations in a friendly, conversational format.
- **📊 Progress & Analytics:** Track your mastery across different subjects (Vocabulary, Grammar, Reading, Listening) and watch your projected exam score grow.

## 🛠️ Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** Custom components inspired by `shadcn/ui`, powered by `lucide-react` for icons and `clsx`/`tailwind-merge` for utility processing.
- **AI Integration:** [OpenRouter API](https://openrouter.ai/) 
  - *Primary Model:* Qwen 3 Next 80B Instruct (for exceptional Japanese nuance and Keigo handling).
  - *Fallback Models:* Llama 3.3 70B & Google Gemma 3 27B.
- **Database:** Neon PostgreSQL (with Drizzle ORM).
- **External APIs:** Jisho API (Unofficial endpoints) for dictionary search.

## 🚀 Getting Started

First, ensure you have your environment variables set up. Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_api_key_here
```

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start exploring the Dashboard, JLPT Prep, and the Vocabulary Dictionary immediately.

## 🎨 Design Philosophy

KotobaLab prioritizes a **premium, dynamic, and glassmorphic** aesthetic. It abandons boring, static flashcards in favor of sleek micro-animations, vibrant color palettes, and engaging UI elements to make studying an addictive experience, not a chore.

---
*Created with passion to make language learning smarter.*

export const XP_REWARDS = {
  CORRECT_ANSWER: 5,
  QUIZ_COMPLETION: 20,
  PERFECT_QUIZ: 50,
  DAILY_CHALLENGE: 50,
  FLASHCARD_REVIEW: 2,
  STREAK_BONUS_7: 100,
  STREAK_BONUS_30: 300,
  EXAM_COMPLETION: 75,
  EXAM_PASS: 150, // ≥ 70% correct
  AI_TUTOR_SESSION: 10,
} as const;

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpToNextLevel(currentXp: number): {
  current: number;
  required: number;
} {
  const level = calculateLevel(currentXp);
  const required = level * level * 100;
  const prev = (level - 1) * (level - 1) * 100;
  return { current: currentXp - prev, required: required - prev };
}

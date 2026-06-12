// SM-2 algorithm for flashcard scheduling
export interface SRSCard {
  interval: number; // days
  easeFactor: number; // 1.3 – 2.5
  difficulty: number; // 0 = new, 1 = hard, 2 = good, 3 = easy, 4 = mastered
}

export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5; // 0-1: fail, 2-5: pass

export function calculateNextReview(
  card: SRSCard,
  grade: ReviewGrade
): {
  interval: number;
  easeFactor: number;
  difficulty: number;
  nextReviewAt: Date;
} {
  let { interval, easeFactor } = card;
  let difficulty = card.difficulty;

  if (grade < 3) {
    // Failed: reset interval
    interval = 1;
  } else {
    // Passed: increase interval
    if (interval === 1) interval = 6;
    else if (interval === 6) interval = 14;
    else interval = Math.round(interval * easeFactor);
  }

  // Update ease factor
  easeFactor =
    easeFactor + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
  easeFactor = Math.max(1.3, Math.min(2.5, easeFactor));

  // Update difficulty label
  if (grade <= 1) difficulty = Math.max(0, difficulty - 1);
  else if (grade <= 3) difficulty = Math.min(4, difficulty + 1);
  else difficulty = 4;

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + interval);

  return { interval, easeFactor, difficulty, nextReviewAt };
}

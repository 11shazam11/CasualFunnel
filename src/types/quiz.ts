export interface QuizQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  currentQuestion: number;
  userAnswers: Record<number, string>;
  visitedQuestions: Set<number>;
  attemptedQuestions: Set<number>;
  timeRemaining: number;
  isQuizComplete: boolean;
  userEmail: string;
}

export interface QuizResults {
  questions: QuizQuestion[];
  userAnswers: Record<number, string>;
  score: number;
  totalQuestions: number;
  timeSpent: number;
}
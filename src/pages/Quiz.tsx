import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmailForm } from "@/components/EmailForm";
import { QuizTimer } from "@/components/QuizTimer";
import { QuestionNavigation } from "@/components/QuestionNavigation";
import { QuestionCard } from "@/components/QuestionCard";
import { QuizResults } from "@/components/QuizResults";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { useToast } from "@/hooks/use-toast";
import {
  QuizQuestion,
  QuizState,
  QuizResults as QuizResultsType,
} from "@/types/quiz";

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

export default function Quiz() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    userAnswers: {},
    visitedQuestions: new Set([0]),
    attemptedQuestions: new Set(),
    timeRemaining: QUIZ_DURATION,
    isQuizComplete: false,
    userEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "The quiz has been automatically submitted.",
      variant: "destructive",
    });
    handleQuizComplete();
  };

  const { timeRemaining, isActive, start, formatTime, isWarning, isCritical } =
    useQuizTimer(QUIZ_DURATION, handleTimeUp);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://opentdb.com/api.php?amount=15");
      const data = await response.json();

      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        throw new Error("Failed to fetch questions");
      }
    } catch (err) {
      setError("Failed to load quiz questions. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setQuizState((prev) => ({ ...prev, userEmail: email }));
    await fetchQuestions();
    setQuizStarted(true);
    start();

    toast({
      title: "Quiz Started!",
      description: "Good luck! You have 30 minutes to complete all questions.",
    });
  };

  const handleAnswerSelect = (answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [prev.currentQuestion]: answer },
      attemptedQuestions: new Set([
        ...prev.attemptedQuestions,
        prev.currentQuestion,
      ]),
    }));
  };

  const handleQuestionSelect = (questionIndex: number) => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: questionIndex,
      visitedQuestions: new Set([...prev.visitedQuestions, questionIndex]),
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      handleQuestionSelect(quizState.currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      handleQuestionSelect(quizState.currentQuestion - 1);
    }
  };

  const handleQuizComplete = () => {
    const score = Object.entries(quizState.userAnswers).reduce(
      (total, [questionIndex, answer]) => {
        const question = questions[parseInt(questionIndex)];
        return total + (answer === question.correct_answer ? 1 : 0);
      },
      0
    );

    const results: QuizResultsType = {
      questions,
      userAnswers: quizState.userAnswers,
      score,
      totalQuestions: questions.length,
      timeSpent: QUIZ_DURATION - timeRemaining,
    };

    // Store results in localStorage for persistence
    localStorage.setItem("quizResults", JSON.stringify(results));
    setShowResults(true);
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      userAnswers: {},
      visitedQuestions: new Set([0]),
      attemptedQuestions: new Set(),
      timeRemaining: QUIZ_DURATION,
      isQuizComplete: false,
      userEmail: "",
    });
    setQuestions([]);
    setQuizStarted(false);
    setShowResults(false);
    setError(null);
    localStorage.removeItem("quizResults");
  };

  // Load saved results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");
    if (savedResults) {
      setShowResults(true);
    }
  }, []);

  if (showResults) {
    const savedResults = localStorage.getItem("quizResults");
    if (savedResults) {
      const results: QuizResultsType = JSON.parse(savedResults);
      return <QuizResults results={results} onRestart={handleRestart} />;
    }
  }

  if (!quizStarted) {
    return <EmailForm onSubmit={handleEmailSubmit} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center cyber-grid">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-foreground">
            Loading quantum questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center cyber-grid">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={fetchQuestions}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const selectedAnswer = quizState.userAnswers[quizState.currentQuestion];

  return (
    <div className="min-h-screen p-6 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              CasualFunnel
            </h1>
            <p className="text-muted-foreground">
              {quizState.userEmail} • Question {quizState.currentQuestion + 1}{" "}
              of {questions.length}
            </p>
          </div>

          <QuizTimer
            timeRemaining={timeRemaining}
            formatTime={formatTime}
            isWarning={isWarning}
            isCritical={isCritical}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <QuestionNavigation
              totalQuestions={questions.length}
              currentQuestion={quizState.currentQuestion}
              visitedQuestions={quizState.visitedQuestions}
              attemptedQuestions={quizState.attemptedQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>

          {/* Question Card */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                questionNumber={quizState.currentQuestion + 1}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                onPrevious={handlePrevious}
                onNext={handleNext}
                canGoPrevious={quizState.currentQuestion > 0}
                canGoNext={quizState.currentQuestion < questions.length - 1}
              />
            )}

            {/* Submit Quiz Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleQuizComplete}
                className="px-8 py-3 bg-gradient-accent text-accent-foreground rounded-lg font-semibold hover:shadow-accent-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit Quiz
              </button>
              <p className="text-sm text-muted-foreground mt-2">
                You can submit anytime or navigate between questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

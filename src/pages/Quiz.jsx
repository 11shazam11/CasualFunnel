import { useState, useEffect } from 'react';
import { QuizTimer } from '../components/QuizTimer';
import { QuestionNavigation } from '../components/QuestionNavigation';
import { QuestionCard } from '../components/QuestionCard';
import { QuizResults } from '../components/QuizResults';
import { useQuizTimer } from '../hooks/useQuizTimer';

const Quiz = ({ onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const handleTimeUp = () => {
    handleQuizComplete();
  };

  const {
    timeRemaining,
    isRunning,
    isWarning,
    isCritical,
    start,
    formatTime,
  } = useQuizTimer(1800, handleTimeUp); // 30 minutes

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !isRunning) {
      start();
    }
  }, [questions, start, isRunning]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      const data = await response.json();
      
      if (data.results) {
        setQuestions(data.results);
      } else {
        throw new Error('Failed to fetch questions');
      }
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handleQuestionSelect = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setVisitedQuestions(prev => new Set([...prev, questionIndex]));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const newQuestion = currentQuestion - 1;
      setCurrentQuestion(newQuestion);
      setVisitedQuestions(prev => new Set([...prev, newQuestion]));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const newQuestion = currentQuestion + 1;
      setCurrentQuestion(newQuestion);
      setVisitedQuestions(prev => new Set([...prev, newQuestion]));
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let score = 0;
    
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        score++;
      }
    });

    const results = {
      questions,
      userAnswers,
      score,
      totalQuestions: questions.length,
      timeSpent,
    };

    setIsComplete(true);
    onComplete(results);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-foreground">Loading Quiz...</h2>
          <p className="text-muted-foreground">Preparing your questions</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md w-full">
          <div className="card-content text-center space-y-4">
            <div className="w-16 h-16 bg-destructive-20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Error Loading Quiz</h2>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return null; // QuizResults will be shown by parent component
  }

  return (
    <div className="min-h-screen p-4 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-10 via-transparent to-secondary-10" />
      
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Header with Timer */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Futuristic Quiz
          </h1>
          
          <QuizTimer
            timeRemaining={timeRemaining}
            formatTime={formatTime}
            isWarning={isWarning}
            isCritical={isCritical}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <QuestionNavigation
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              visitedQuestions={visitedQuestions}
              attemptedQuestions={attemptedQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            {questions[currentQuestion] && (
              <QuestionCard
                question={questions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                selectedAnswer={userAnswers[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                onPrevious={handlePrevious}
                onNext={handleNext}
                canGoPrevious={currentQuestion > 0}
                canGoNext={true}
              />
            )}
          </div>
        </div>

        {/* Quiz Actions */}
        <div className="flex justify-center">
          <button
            onClick={handleQuizComplete}
            className="btn btn-secondary btn-lg"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
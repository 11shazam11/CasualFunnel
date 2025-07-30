import { cn, decodeHtml } from '../lib/utils';

export const QuizResults = ({ results, onRestart }) => {
  const { questions, userAnswers, score, totalQuestions, timeSpent } = results;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-accent';
    if (percentage >= 60) return 'text-primary';
    return 'text-destructive';
  };

  const getScoreGradient = () => {
    if (percentage >= 80) return 'bg-gradient-accent';
    if (percentage >= 60) return 'bg-gradient-primary';
    return 'bg-gradient-to-r from-destructive to-destructive-glow';
  };

  return (
    <div className="min-h-screen p-6 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-10 via-transparent to-secondary-10" />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header with Score */}
        <div className="card neon-border holographic">
          <div className="card-header text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-cyber flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
          </div>
          
          <div className="card-content text-center space-y-6">
            <div className="grid grid-cols-1 md-grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Score</span>
                </div>
                <div className={cn("text-3xl font-bold", getScoreColor())}>
                  {score}/{totalQuestions}
                </div>
                <div className={cn("text-5xl font-bold bg-clip-text text-transparent", getScoreGradient())}>
                  {percentage}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Time Spent</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatTime(timeSpent)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round((score / Object.keys(userAnswers).length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {Object.keys(userAnswers).length} attempted
                </div>
              </div>
            </div>
            
            <button
              onClick={onRestart}
              className="btn btn-cyber btn-lg mt-6"
            >
              Take Another Quiz
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Detailed Results
          </h2>
          
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;
            const wasAttempted = userAnswer !== undefined;
            
            return (
              <div key={index} className="card neon-border backdrop-blur-sm">
                <div className="card-header">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                      isCorrect && "bg-accent-20 text-accent",
                      !isCorrect && wasAttempted && "bg-destructive-20 text-destructive",
                      !wasAttempted && "bg-muted text-muted-foreground"
                    )}>
                      {isCorrect ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {index + 1}
                        </span>
                        <span className="px-2 py-1 rounded bg-primary-10 text-primary text-xs">
                          {question.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="card-title text-lg leading-relaxed mb-4">
                        {decodeHtml(question.question)}
                      </h3>
                      
                      <div className="grid gap-3">
                        {wasAttempted && (
                          <div className={cn(
                            "p-3 rounded-lg border",
                            isCorrect 
                              ? "border-accent-50 bg-accent-10 text-accent"
                              : "border-destructive-50 bg-destructive-10 text-destructive"
                          )}>
                            <div className="text-sm font-medium mb-1">Your Answer:</div>
                            <div>{decodeHtml(userAnswer)}</div>
                          </div>
                        )}
                        
                        {!isCorrect && (
                          <div className="p-3 rounded-lg border border-accent-50 bg-accent-10 text-accent">
                            <div className="text-sm font-medium mb-1">Correct Answer:</div>
                            <div>{decodeHtml(question.correct_answer)}</div>
                          </div>
                        )}
                        
                        {!wasAttempted && (
                          <div className="p-3 rounded-lg border border-muted bg-muted text-muted-foreground">
                            <div className="text-sm font-medium mb-1">Not Attempted</div>
                            <div className="text-sm">Correct Answer: {decodeHtml(question.correct_answer)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
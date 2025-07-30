import { cn } from '../lib/utils';

export const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  attemptedQuestions,
  onQuestionSelect,
}) => {
  return (
    <div className="neon-border rounded-lg p-6 bg-card backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Question Overview</h3>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isVisited = visitedQuestions.has(index);
          const isAttempted = attemptedQuestions.has(index);
          const isCurrent = currentQuestion === index;
          
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={cn(
                "question-nav-item",
                isCurrent && "current",
                isAttempted && "attempted",
                isVisited && !isAttempted && "visited",
                !isVisited && !isAttempted && "border-muted text-muted-foreground hover-border-primary-30"
              )}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="question-nav-item attempted w-4 h-4" />
          <span className="text-muted-foreground">Attempted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="question-nav-item visited w-4 h-4" />
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="question-nav-item current w-4 h-4" />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="question-nav-item w-4 h-4 border-muted" />
          <span className="text-muted-foreground">Not visited</span>
        </div>
      </div>
    </div>
  );
};
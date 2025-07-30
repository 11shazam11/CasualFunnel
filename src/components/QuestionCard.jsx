import { useState } from 'react';
import { cn, decodeHtml } from '../lib/utils';

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  // Combine and shuffle answer options
  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="card neon-border backdrop-blur-sm">
      <div className="card-header">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">
                {questionNumber}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-primary-10 text-primary">
              {question.difficulty}
            </span>
            <span className="px-2 py-1 rounded bg-secondary-10 text-secondary">
              {decodeHtml(question.category)}
            </span>
          </div>
        </div>
        
        <h2 className="card-title text-xl leading-relaxed">
          {decodeHtml(question.question)}
        </h2>
      </div>
      
      <div className="card-content space-y-4">
        <div className="grid gap-3">
          {allAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isHovered = hoveredOption === answer;
            
            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(answer)}
                onMouseEnter={() => setHoveredOption(answer)}
                onMouseLeave={() => setHoveredOption(null)}
                className={cn(
                  "p-4 rounded-lg text-left transition-all duration-300 neon-border",
                  "hover-border-primary-50 hover-bg-primary-10",
                  isSelected && "border-accent-50 bg-accent-10 shadow-accent-glow",
                  isHovered && !isSelected && "border-primary-30 bg-primary-10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all duration-300",
                    isSelected && "border-accent bg-accent",
                    !isSelected && "border-muted"
                  )}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                      </div>
                    )}
                  </div>
                  <span className="flex-1 text-foreground">
                    {decodeHtml(answer)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="flex justify-between pt-6">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={cn(
              "btn btn-outline flex items-center gap-2",
              !canGoPrevious && "disabled"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={cn(
              "btn btn-primary flex items-center gap-2",
              !canGoNext && "disabled"
            )}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
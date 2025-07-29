import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

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
}: QuestionCardProps) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  // Combine and shuffle answer options
  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort();

  // Decode HTML entities
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Card className="neon-border bg-card/80 backdrop-blur-sm">
      <CardHeader>
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
            <span className="px-2 py-1 rounded bg-primary/10 text-primary">
              {question.difficulty}
            </span>
            <span className="px-2 py-1 rounded bg-secondary/10 text-secondary">
              {decodeHtml(question.category)}
            </span>
          </div>
        </div>
        
        <CardTitle className="text-xl leading-relaxed">
          {decodeHtml(question.question)}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
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
                  "hover:border-primary/50 hover:bg-primary/5",
                  isSelected && "border-accent/80 bg-accent/10 shadow-accent-glow",
                  isHovered && !isSelected && "border-primary/40 bg-primary/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all duration-300",
                    isSelected && "border-accent bg-accent",
                    !isSelected && "border-muted-foreground/30"
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
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            variant="default"
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
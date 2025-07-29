import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizResults as QuizResultsType } from '@/types/quiz';

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

export const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  const { questions, userAnswers, score, totalQuestions, timeSpent } = results;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const formatTime = (seconds: number) => {
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header with Score */}
        <Card className="neon-border holographic">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-cyber flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-foreground" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              Quiz Complete!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Target className="w-5 h-5" />
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
                  <Clock className="w-5 h-5" />
                  <span>Time Spent</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatTime(timeSpent)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5" />
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
            
            <Button
              onClick={onRestart}
              variant="cyber"
              size="lg"
              className="mt-6"
            >
              Take Another Quiz
            </Button>
          </CardContent>
        </Card>

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
              <Card key={index} className="neon-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                      isCorrect && "bg-accent/20 text-accent",
                      !isCorrect && wasAttempted && "bg-destructive/20 text-destructive",
                      !wasAttempted && "bg-muted/20 text-muted-foreground"
                    )}>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {index + 1}
                        </span>
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                          {question.difficulty}
                        </span>
                      </div>
                      
                      <CardTitle className="text-lg leading-relaxed mb-4">
                        {decodeHtml(question.question)}
                      </CardTitle>
                      
                      <div className="grid gap-3">
                        {wasAttempted && (
                          <div className={cn(
                            "p-3 rounded-lg border",
                            isCorrect 
                              ? "border-accent/50 bg-accent/10 text-accent"
                              : "border-destructive/50 bg-destructive/10 text-destructive"
                          )}>
                            <div className="text-sm font-medium mb-1">Your Answer:</div>
                            <div>{decodeHtml(userAnswer)}</div>
                          </div>
                        )}
                        
                        {!isCorrect && (
                          <div className="p-3 rounded-lg border border-accent/50 bg-accent/10 text-accent">
                            <div className="text-sm font-medium mb-1">Correct Answer:</div>
                            <div>{decodeHtml(question.correct_answer)}</div>
                          </div>
                        )}
                        
                        {!wasAttempted && (
                          <div className="p-3 rounded-lg border border-muted bg-muted/10 text-muted-foreground">
                            <div className="text-sm font-medium mb-1">Not Attempted</div>
                            <div className="text-sm">Correct Answer: {decodeHtml(question.correct_answer)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
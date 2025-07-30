import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizTimerProps {
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  isWarning: boolean;
  isCritical: boolean;
}

export const QuizTimer = ({ timeRemaining, formatTime, isWarning, isCritical }: QuizTimerProps) => {
  return (
    <div className={cn(
      "flex items-center gap-3 px-6 py-3 rounded-lg neon-border",
      isCritical && "border-destructive/50 bg-destructive/10",
      isWarning && !isCritical && "border-accent/50 bg-accent/10",
      !isWarning && "border-primary/30 bg-primary/5"
    )}>
      <div className={cn(
        "p-2 rounded-full",
        isCritical && "bg-destructive/20 text-destructive pulse-glow",
        isWarning && !isCritical && "bg-accent/20 text-accent",
        !isWarning && "bg-primary/20 text-primary"
      )}>
        {isCritical ? (
          <AlertTriangle className="w-5 h-5" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Time Remaining
        </span>
        <span className={cn(
          "timer-display text-xl font-mono font-bold",
          isCritical && "timer-warning text-destructive",
          isWarning && !isCritical && "text-accent",
          !isWarning && "text-primary"
        )}>
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
};
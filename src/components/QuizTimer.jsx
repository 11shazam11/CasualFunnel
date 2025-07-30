import { cn } from '../lib/utils';

export const QuizTimer = ({ timeRemaining, formatTime, isWarning, isCritical }) => {
  return (
    <div className={cn(
      "flex items-center gap-3 px-6 py-3 rounded-lg neon-border",
      isCritical && "border-destructive-50 bg-destructive-10",
      isWarning && !isCritical && "border-accent-50 bg-accent-10",
      !isWarning && "border-primary-30 bg-primary-10"
    )}>
      <div className={cn(
        "p-2 rounded-full",
        isCritical && "bg-destructive-20 text-destructive pulse-glow",
        isWarning && !isCritical && "bg-accent-20 text-accent",
        !isWarning && "bg-primary-20 text-primary"
      )}>
        {isCritical ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
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
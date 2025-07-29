import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

export const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    onSubmit(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <Card className="w-full max-w-md neon-border holographic relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-cyber flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">Q</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            QuantumQuiz
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email to begin the ultimate knowledge challenge
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="neon-border bg-background/50 h-12 text-center"
                required
              />
            </div>
            
            <Button
              type="submit"
              variant="cyber"
              size="lg"
              className="w-full"
              disabled={!email || !email.includes('@') || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Initializing...
                </div>
              ) : (
                'Start Quiz'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>• 15 challenging questions</p>
            <p>• 30 minutes time limit</p>
            <p>• Navigate freely between questions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
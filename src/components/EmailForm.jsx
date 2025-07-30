import { useState } from 'react';
import { cn } from '../lib/utils';

export const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-10 via-transparent to-secondary-10"></div>
      
      <div className="max-w-md w-full space-y-6 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-cyber flex items-center justify-center mb-6">
            <svg className="icon-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Futuristic Quiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Test your knowledge with our advanced quiz system
          </p>
        </div>

        <div className="card holographic">
          <div className="card-header">
            <h2 className="card-title text-center">Enter Your Email</h2>
            <p className="text-sm text-muted-foreground text-center">
              We'll use this to track your progress
            </p>
          </div>
          
          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="input"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={!email || !email.includes('@') || isSubmitting}
                className={cn(
                  "btn btn-cyber w-full",
                  (!email || !email.includes('@') || isSubmitting) && "disabled"
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="icon-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Starting Quiz...
                  </>
                ) : (
                  <>
                    Start Quiz
                    <svg className="icon-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>• 15 challenging questions</p>
          <p>• 30 minutes time limit</p>
          <p>• Instant results with detailed explanations</p>
        </div>
      </div>
    </div>
  );
};
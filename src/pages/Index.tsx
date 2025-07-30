import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, Target, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Smart Questions",
      description: "15 carefully curated questions from diverse categories"
    },
    {
      icon: Clock,
      title: "Time Challenge",
      description: "30-minute countdown to test your quick thinking"
    },
    {
      icon: Target,
      title: "Navigate Freely",
      description: "Jump between questions and track your progress"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Detailed breakdown of your performance"
    }
  ];

  return (
    <div className="min-h-screen cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-cyber flex items-center justify-center mb-8 pulse-glow">
            <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent">CF</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
            CasualFunnel
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Experience the future of knowledge testing with our 
            <span className="text-primary"> cyberpunk-inspired </span>
            quiz platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cyber" 
              size="lg" 
              onClick={() => navigate('/quiz')}
              className="text-lg px-8 py-4"
            >
              Start Your Quest
            </Button>
            <p className="text-sm text-muted-foreground">
              No registration required • Free to play
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="neon-border holographic group hover:shadow-primary-glow transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="neon-border bg-card/50 backdrop-blur-sm max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15</div>
                <div className="text-muted-foreground">Challenging Questions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">30</div>
                <div className="text-muted-foreground">Minutes to Complete</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">∞</div>
                <div className="text-muted-foreground">Attempts Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Built with cutting-edge technology for the ultimate quiz experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

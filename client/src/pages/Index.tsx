import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="font-bold text-2xl text-primary">PitchBridge</div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-primary hover:opacity-90">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            🚀 Connecting Innovation with Investment
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Bridge the Gap Between
            <span className="text-primary block">Ideas & Investment</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The secure platform where entrepreneurs showcase video pitches and investors discover 
            the next breakthrough innovations. Connect, collaborate, and create the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                <Users className="h-5 w-5 mr-2" />
                Join as Investor
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Play className="h-5 w-5 mr-2" />
                Pitch Your Idea
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-8">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Pitches</h3>
              <p className="text-muted-foreground">
                Upload compelling video presentations or share external links to showcase your innovation
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-8">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
              <p className="text-muted-foreground">
                Advanced algorithms connect entrepreneurs with investors based on industry interests and funding needs
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-8">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with JWT authentication and encrypted communications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Trusted by Innovation Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Entrepreneurs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Active Investors</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
              <p className="text-muted-foreground">Funding Facilitated</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card className="shadow-card border-0 bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Future?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of entrepreneurs and investors already building tomorrow's innovations
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="font-semibold">
                Start Your Journey Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 PitchBridge. Connecting innovation with investment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

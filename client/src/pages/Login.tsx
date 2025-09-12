import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Users, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'investor' as 'entrepreneur' | 'investor',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password, formData.role);
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
      } else {
        await register(formData.email, formData.password, formData.name, formData.role);
        toast({
          title: "Account created!",
          description: "Welcome to VenturoNest.",
        });
      }
      
      // Redirect based on role
      if (formData.role === 'investor') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const fillDemoData = (role: 'entrepreneur' | 'investor') => {
    setFormData({
      email: role === 'investor' ? 'investor@demo.com' : 'entrepreneur@demo.com',
      password: 'demo123',
      name: role === 'investor' ? 'John Investor' : 'Sarah Chen',
      role,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div>
            <Link to="/" className="inline-block">
              <h1 className="text-4xl font-bold text-primary mb-2">VenturoNest</h1>
            </Link>
            <p className="text-xl text-muted-foreground">
              Where innovation meets investment
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 justify-center lg:justify-start">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">For Investors</p>
                <p className="text-sm text-muted-foreground">Discover breakthrough innovations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 justify-center lg:justify-start">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">For Entrepreneurs</p>
                <p className="text-sm text-muted-foreground">Showcase your vision to the world</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-primary">Demo Credentials:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fillDemoData('investor')}
                className="justify-start h-auto p-2"
              >
                <Users className="h-3 w-3 mr-2" />
                <div className="text-left">
                  <div>investor@demo.com</div>
                  <div className="text-muted-foreground">password: demo123</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fillDemoData('entrepreneur')}
                className="justify-start h-auto p-2"
              >
                <Lightbulb className="h-3 w-3 mr-2" />
                <div className="text-left">
                  <div>entrepreneur@demo.com</div>
                  <div className="text-muted-foreground">password: demo123</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <Card className="shadow-card border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'login' 
                ? 'Sign in to your account to continue' 
                : 'Join the community of innovators and investors'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>I am a...</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={formData.role === 'investor' ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, role: 'investor' })}
                      className="justify-start h-auto p-3"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Investor</div>
                        <div className="text-xs opacity-70">Looking for opportunities</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={formData.role === 'entrepreneur' ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, role: 'entrepreneur' })}
                      className="justify-start h-auto p-3"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Entrepreneur</div>
                        <div className="text-xs opacity-70">Seeking investment</div>
                      </div>
                    </Button>
                  </div>
                </div>

                <TabsContent value="register" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        type="text"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type={showPassword ? 'text' : 'password'}
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Please wait...'
                  ) : (
                    <>
                      {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  {activeTab === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
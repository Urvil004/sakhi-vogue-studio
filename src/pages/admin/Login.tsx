import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    console.log('Auth state changed - User:', user, 'IsAdmin:', isAdmin);
    if (user && isAdmin) {
      console.log('User is already logged in as admin, redirecting...');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setError("Please enter both email and password");
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    console.log('=== Login Attempt ===');
    console.log('Email:', email);
    
    try {
      console.log('Calling signIn...');
      const result = await signIn(email, password);
      console.log('SignIn result:', result);
      
      if (result.error) {
        console.error('Login error:', result.error);
        const errorMessage = result.error.message || "Invalid email or password";
        setError(errorMessage);
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (result.isAdmin) {
        console.log('Login successful! User is admin. Redirecting...');
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        
        // Small delay to let toast show
        setTimeout(() => {
          console.log('Navigating to /admin/dashboard');
          navigate('/admin/dashboard', { replace: true });
        }, 500);
      } else {
        console.log('User logged in but is NOT admin');
        setError("You don't have admin privileges. Contact administrator.");
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges. Contact administrator.",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Unexpected login error:', error);
      const errorMessage = error.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setError("Please enter both email and password");
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    console.log('=== Signup Attempt ===');
    console.log('Email:', email);
    
    try {
      const result = await signUp(email, password);
      console.log('SignUp result:', result);
      
      if (result.error) {
        console.error('Signup error:', result.error);
        const errorMessage = result.error.message || "Could not create account";
        setError(errorMessage);
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Account Created",
        description: "Please contact administrator to grant admin privileges.",
      });
      
      // Clear form
      setEmail("");
      setPassword("");
      setLoading(false);
      
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      const errorMessage = error.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/30 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Portal</CardTitle>
          <CardDescription className="text-center">
            Sakhi Designer Studio Gallery Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setError(null)}
                className="flex-shrink-0 h-auto p-1"
              >
                ×
              </Button>
            </div>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" disabled={loading}>Login</TabsTrigger>
              <TabsTrigger value="signup" disabled={loading}>Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={loading}
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Note: You'll need admin privileges to access the dashboard
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

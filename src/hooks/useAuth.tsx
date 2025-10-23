import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; isAdmin: boolean }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user role from database with timeout
  const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
      console.log('Checking admin role for user:', userId);
      
      // Create a timeout promise
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('Admin role check timeout')), 10000); // 10 second timeout
      });
      
      // Race between the query and timeout
      const result = await Promise.race([
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .single(),
        timeoutPromise
      ]);

      // Handle timeout
      if (result === null) {
        console.error('Admin role check timed out');
        return false;
      }

      const { data, error } = result as any;

      if (error) {
        console.error('Error checking admin role:', error);
        // If row doesn't exist, user is not admin
        if (error.code === 'PGRST116') {
          console.log('No role found for user - not admin');
          return false;
        }
        return false;
      }

      console.log('User role data:', data);
      const isUserAdmin = data?.role === 'admin';
      console.log('Is user admin?', isUserAdmin);
      
      return isUserAdmin;
    } catch (error) {
      console.error('Exception checking admin role:', error);
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('=== Initializing Auth ===');
    
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email || 'No session');
      
      if (session?.user) {
        setUser(session.user);
        const adminStatus = await checkAdminRole(session.user.id);
        setIsAdmin(adminStatus);
        console.log('Initial admin status:', adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email || 'No user');
      
      if (session?.user) {
        setUser(session.user);
        const adminStatus = await checkAdminRole(session.user.id);
        setIsAdmin(adminStatus);
        console.log('Auth change - Admin status:', adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
        console.log('Auth change - User logged out');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('=== SignIn Function Called ===');
      console.log('Email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('SignIn error:', error);
        return { error, isAdmin: false };
      }

      console.log('SignIn successful, user:', data.user?.email);
      
      if (data.user) {
        const adminStatus = await checkAdminRole(data.user.id);
        console.log('SignIn - Admin status:', adminStatus);
        setUser(data.user);
        setIsAdmin(adminStatus);
        return { error: null, isAdmin: adminStatus };
      }

      return { error: new Error('No user returned'), isAdmin: false };
    } catch (error: any) {
      console.error('SignIn exception:', error);
      return { error, isAdmin: false };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('=== SignUp Function Called ===');
      console.log('Email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('SignUp error:', error);
        return { error };
      }

      console.log('SignUp successful, user:', data.user?.email);
      return { error: null };
    } catch (error: any) {
      console.error('SignUp exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('=== SignOut Function Called ===');
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      console.log('SignOut successful');
    } catch (error) {
      console.error('SignOut error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

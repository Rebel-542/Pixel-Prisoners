
"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { 
  type User, 
  type AuthError,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useToast } from '@/hooks/use-toast';

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const signUp = useCallback(async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: 'Account Created', description: 'Successfully signed up!' });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing up:", authError);
      toast({ title: 'Sign Up Error', description: authError.message || 'Failed to sign up.', variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const signIn = useCallback(async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Signed In', description: 'Successfully signed in!' });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing in:", authError);
      toast({ title: 'Sign In Error', description: authError.message || 'Failed to sign in. Check your credentials.', variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
      toast({ title: 'Signed Out', description: 'Successfully signed out.' });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing out:", authError);
      toast({ title: 'Sign Out Error', description: authError.message || 'Failed to sign out.', variant: 'destructive' });
    }
  }, [toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
         <div className="flex items-center justify-center min-h-screen">
          {/* You can replace this with a more sophisticated loader/spinner component */}
          <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </AuthContext.Provider>
  );
};

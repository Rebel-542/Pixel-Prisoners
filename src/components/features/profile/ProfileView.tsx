"use client";
import type { User } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ProfileViewProps {
  currentUser: User;
}

export function ProfileView({ currentUser }: ProfileViewProps) {
  const { logOut } = useAuth();

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'GA'; // Guardian Angel
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="items-center text-center">
        <Avatar className="w-28 h-28 mb-4 border-4 border-primary shadow-md">
          {/* Placeholder for AvatarImage if user images are stored */}
          {/* <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || currentUser.email || "User"} /> */}
          <AvatarFallback className="text-4xl bg-primary/10 text-primary font-semibold">
            {getInitials(currentUser.email)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl">Your Profile</CardTitle>
        <CardDescription className="text-md">
          Welcome back to Guardian Angel! Manage your account and settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-md">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="font-medium">{currentUser.email}</p>
            </div>
          </div>
          {/* Example: Link to settings page */}
          <Button asChild variant="outline" className="w-full">
            <Link href="/settings">
              <ShieldCheck className="mr-2 h-4 w-4" /> App Settings & API Key
            </Link>
          </Button>
        </div>
        
        <Button onClick={logOut} className="w-full" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </CardContent>
    </Card>
  );
}

"use client";

import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/features/auth/AuthForm';
import { ProfileView } from '@/components/features/profile/ProfileView';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      {currentUser ? <ProfileView currentUser={currentUser} /> : <AuthForm />}
    </div>
  );
}

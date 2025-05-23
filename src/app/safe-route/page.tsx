
"use client";

import { useAuth } from '@/hooks/useAuth';
import { SafeRoutePlanner } from "@/components/features/safe-route/SafeRoutePlanner";
import { Loader2 } from 'lucide-react';

export default function SafeRoutePage() {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Safe Route Suggestion</h1>
        <SafeRoutePlanner />
      </div>
    </div>
  );
}


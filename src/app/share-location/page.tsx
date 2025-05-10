
"use client";

import { useAuth } from '@/hooks/useAuth';
import { LocationSharingManager } from "@/components/features/location-sharing/LocationSharingManager";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Loader2, MapPin } from 'lucide-react';

export default function ShareLocationPage() {
  const { currentUser, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Content is now shown even if !currentUser.
  // LocationSharingManager will render. If contacts are needed from a logged-in user's account,
  // LocationSharingManager should handle the state where currentUser is null (e.g., disable sharing or prompt login).

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Share Your Location</h1>
        {!currentUser && (
          <Card className="mb-8 shadow-lg border-primary/50 bg-primary/5">
            <CardHeader className="text-center">
               <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3 text-primary">
                <MapPin className="h-8 w-8" />
              </div>
              <CardTitle>Login to Share Location</CardTitle>
              <CardDescription>
                Please log in to share your location with your trusted contacts from your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg">
                <Link href="/profile?redirect=/share-location">Login / Sign Up</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        <LocationSharingManager />
      </div>
    </div>
  );
}

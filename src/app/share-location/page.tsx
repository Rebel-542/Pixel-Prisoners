
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

  if (!currentUser) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader>
             <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 text-primary">
              <MapPin className="h-12 w-12" />
            </div>
            <CardTitle>Share Your Location Safely</CardTitle>
            <CardDescription>
              Please log in or create an account to share your location with your trusted contacts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full">
              <Link href="/profile?redirect=/share-location">Login / Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Share Your Location</h1>
        <LocationSharingManager />
      </div>
    </div>
  );
}


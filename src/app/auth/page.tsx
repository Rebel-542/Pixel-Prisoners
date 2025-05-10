"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthenticationRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectParam = searchParams.get('redirect');
    let destination = '/profile';
    if (redirectParam) {
      destination += `?redirect=${encodeURIComponent(redirectParam)}`;
    }
    router.replace(destination);
  }, [router, searchParams]);

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Redirecting to your profile...</p>
    </div>
  );
}

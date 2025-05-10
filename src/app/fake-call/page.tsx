
"use client";

import { useState } from 'react';
import { FakeCallScreen } from '@/components/features/fake-call/FakeCallScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneCall, Zap } from 'lucide-react';
import Image from 'next/image';

export default function FakeCallPage() {
  const [showFakeCall, setShowFakeCall] = useState(false);

  const handleStartFakeCall = () => {
    setShowFakeCall(true);
  };

  const handleEndFakeCall = () => {
    setShowFakeCall(false);
  };

  if (showFakeCall) {
    return <FakeCallScreen onEndCall={handleEndFakeCall} />;
  }

  return (
    <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-8rem)]"> {/* Adjusted min-height */}
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 text-primary">
            <PhoneCall className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Simulate Fake Call</CardTitle>
          <CardDescription>
            Need a quick escape from an uncomfortable situation? Simulate an incoming call.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="w-full h-48 relative rounded-lg overflow-hidden bg-muted" data-ai-hint="phone ringing">
            <Image src="https://picsum.photos/seed/fakecallui/400/200" layout="fill" objectFit="cover" alt="Phone call illustration" />
          </div>
          <Button onClick={handleStartFakeCall} size="lg" className="w-full">
            <Zap className="mr-2 h-5 w-5" /> Start Fake Call
          </Button>
          <p className="text-xs text-muted-foreground">
            This will display a realistic incoming call screen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

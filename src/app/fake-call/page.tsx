
"use client";

import { useState } from 'react';
import { FakeCallScreen } from '@/components/features/fake-call/FakeCallScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneCall, Zap } from 'lucide-react';
import Image from 'next/image';

// Use the user-provided static image URL
const STATIC_IMAGE_URL = "https://fireworks.proxy.beehiiv.com/v2/images/5252c38d-37a4-4137-9b49-be360a15cb18.png?width=1024&height=996&fit=contain&auto=compress&compression=fast";

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
    <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-8rem)]"> 
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
           <div className="w-full h-64 md:h-72 relative rounded-lg overflow-hidden bg-muted flex items-center justify-center border">
            <Image 
              src={STATIC_IMAGE_URL} 
              alt="Memoji-style avatar on a call with a classic phone receiver" 
              layout="fill" 
              objectFit="contain" 
              data-ai-hint="avatar call"
              className="p-2"
            />
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

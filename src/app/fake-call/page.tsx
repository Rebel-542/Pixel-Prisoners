
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; 
import { FakeCallScreen } from '@/components/features/fake-call/FakeCallScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneCall, Zap, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { generateFakeCallImage } from '@/ai/flows/generate-fake-call-image-flow';
import { useToast } from "@/hooks/use-toast";

const STATIC_IMAGE_URL = "https://fireworks.proxy.beehiiv.com/v2/images/5252c38d-37a4-4137-9b49-be360a15cb18.png?width=1024&height=996&fit=contain&auto=compress&compression=fast";

export default function FakeCallPage() {
  const { loading: authLoading } = useAuth(); 

  const [showFakeCall, setShowFakeCall] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(STATIC_IMAGE_URL);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadImage() {
      setIsImageLoading(true);
      try {
        const result = await generateFakeCallImage();
        if (result && result.imageDataUri) {
          setImageUrl(result.imageDataUri);
        } else {
          setImageUrl(STATIC_IMAGE_URL); // Fallback to static if AI fails
          toast({
            title: "Image Info",
            description: "Could not generate a dynamic image, using default.",
            variant: "default" 
          });
        }
      } catch (error) {
        console.error("Failed to generate fake call image:", error);
        setImageUrl(STATIC_IMAGE_URL); // Fallback to static on error
        toast({
          title: "Image Generation Failed",
          description: "Using default image. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsImageLoading(false);
      }
    }
    loadImage();
  }, [toast]); 

  const handleStartFakeCall = () => {
    setShowFakeCall(true);
  };

  const handleEndFakeCall = () => {
    setShowFakeCall(false);
  };

  if (authLoading) { 
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

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
            {isImageLoading ? (
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            ) : (
              <Image 
                src={imageUrl} 
                alt="Memoji-style avatar on a call with a classic phone receiver" 
                layout="fill" 
                objectFit="contain" 
                data-ai-hint="avatar call"
                className="p-2"
                unoptimized={imageUrl.startsWith('data:')}
              />
            )}
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

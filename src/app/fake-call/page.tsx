
"use client";

import { useState, useEffect } from 'react';
import { FakeCallScreen } from '@/components/features/fake-call/FakeCallScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneCall, Zap, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { generateFakeCallImage, type GenerateFakeCallImageOutput } from '@/ai/flows/generate-fake-call-image-flow';
import { useToast } from '@/hooks/use-toast';

export default function FakeCallPage() {
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchImage = async () => {
      if (showFakeCall) return; // Don't generate if already on fake call screen

      setIsGeneratingImage(true);
      setGeneratedImageUrl(null); // Clear previous image
      try {
        const result: GenerateFakeCallImageOutput = await generateFakeCallImage();
        setGeneratedImageUrl(result.imageDataUri);
      } catch (error) {
        console.error("Failed to generate fake call image:", error);
        toast({
          title: "Image Generation Failed",
          description: "Could not generate the helper image. Using a placeholder.",
          variant: "destructive",
        });
        // Fallback to a generic placeholder if generation fails
        setGeneratedImageUrl("https://picsum.photos/seed/defaultFakeCall/400/200");
      } finally {
        setIsGeneratingImage(false);
      }
    };

    fetchImage();
  }, [showFakeCall, toast]);

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
           <div className="w-full h-64 md:h-72 relative rounded-lg overflow-hidden bg-muted flex items-center justify-center border"> {/* Increased height slightly */}
            {isGeneratingImage && (
              <div className="flex flex-col items-center text-muted-foreground p-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-3 text-sm">Generating image for you...</p>
              </div>
            )}
            {!isGeneratingImage && generatedImageUrl && (
              <Image 
                src={generatedImageUrl} 
                layout="fill" 
                objectFit="contain" 
                alt="AI generated illustration for fake call" 
                data-ai-hint="woman headset"
                className="p-2" // Add some padding around the image
              />
            )}
            {!isGeneratingImage && !generatedImageUrl && ( 
                <div className="text-muted-foreground p-4 text-center">
                    <p>Image could not be loaded.</p>
                    <p className="text-xs">Displaying default placeholder.</p>
                     <Image 
                        src="https://picsum.photos/seed/fallbackFakeCall/400/200" 
                        width={400}
                        height={200}
                        objectFit="cover" 
                        alt="Fallback placeholder image" 
                        className="mt-2 rounded"
                        data-ai-hint="placeholder image"
                    />
                </div>
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


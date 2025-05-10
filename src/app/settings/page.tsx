"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AdvancedFeatureSetting } from "@/components/features/settings/AdvancedFeatureSetting";
import { SmartphoneNfc, Mic, Camera, KeyRound, Save, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API_KEY_STORAGE_KEY = "geminiApiKey";

export default function SettingsPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true); 
    if (!authLoading && !currentUser) {
      router.push('/profile?redirect=/settings');
    }
  }, [currentUser, authLoading, router]);
  
  useEffect(() => {
    if (currentUser && isClientMounted) {
      const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    }
  }, [currentUser, isClientMounted]);


  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Empty",
        description: "Please enter a valid Gemini API Key.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API Key has been saved in your browser's local storage.",
    });
  };

  const handleClearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey("");
    toast({
      title: "API Key Cleared",
      description: "Your Gemini API Key has been cleared from local storage.",
    });
  };

  if (authLoading || (!currentUser && !authLoading) || !isClientMounted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Settings & Advanced Features</h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <KeyRound className="h-6 w-6 text-primary" />
              <CardTitle>Gemini API Key Configuration</CardTitle>
            </div>
            <CardDescription>
              Manage your Google Gemini API Key. This key is used for AI-powered features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiKey">Your Gemini API Key</Label>
              <Input
                id="apiKey"
                type="password" 
                placeholder="Enter your Gemini API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSaveApiKey}>
                <Save className="mr-2 h-4 w-4" /> Save to Browser
              </Button>
              <Button onClick={handleClearApiKey} variant="outline">
                <Trash2 className="mr-2 h-4 w-4" /> Clear Key
              </Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 pt-2">
              <p className="font-semibold">Important Notes:</p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>This key is stored in your browser's local storage only.</li>
                <li>
                  For AI features that run on the server (like Safe Route, Fake Call Image Generation):
                  you must set this key as <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">GOOGLE_API_KEY</code> in your project's <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.env</code> file and restart the application server.
                </li>
                <li>
                  Saving the key here can be useful for potential future features that run directly in your browser or for easily copying it into your <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.env</code> file.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <AdvancedFeatureSetting
          id="panic-shake"
          icon={<SmartphoneNfc className="h-6 w-6" />}
          title="Panic Shake Activation"
          description="Trigger SOS by shaking your phone vigorously, even when locked."
          note="This feature typically requires native app capabilities for reliable background operation and may be limited in a web environment. The toggle is for simulation purposes."
        />
        <AdvancedFeatureSetting
          id="voice-recording"
          icon={<Mic className="h-6 w-6" />}
          title="Secret Voice Recording on SOS"
          description="Automatically start silent voice recording when SOS is triggered and upload for evidence."
          note="Requires microphone access. Background recording and cloud upload functionality are complex and may have limitations in web apps. This is a simulated feature toggle."
        />
        <AdvancedFeatureSetting
          id="photo-capture"
          icon={<Camera className="h-6 w-6" />}
          title="Silent Photo Capture on SOS"
          description="Capture a background photo from front/rear camera when SOS is triggered."
          note="Requires camera access. Silent, background photo capture is highly dependent on device and browser capabilities and often restricted for privacy. This toggle is for simulation."
        />
      </div>
      
      <div className="mt-12 text-center p-4 border-t border-dashed">
        <h2 className="text-xl font-semibold mb-2">Developer's Note</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Features like Panic Shake, background recording, and silent photo capture present significant technical and privacy challenges in web applications.
          Full implementation often requires native mobile application development. The toggles above are for demonstration and conceptual understanding.
          Similarly, managing API keys securely and dynamically for server-side operations requires careful server architecture if keys are to be changed without server restarts. The current setup relies on environment variables for server-side API key usage.
        </p>
      </div>
    </div>
  );
}

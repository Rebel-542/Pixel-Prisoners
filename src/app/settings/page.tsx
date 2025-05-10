
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AdvancedFeatureSetting } from "@/components/features/settings/AdvancedFeatureSetting";
import { ProfileView } from '@/components/features/profile/ProfileView';
import { SmartphoneNfc, Mic, Camera, KeyRound, Save, Trash2, Loader2, UserCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

const API_KEY_STORAGE_KEY = "geminiApiKey";

export default function SettingsPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true); 
  }, []);
  
  useEffect(() => {
    if (isClientMounted) {
      const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    }
  }, [isClientMounted]);


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

  if (authLoading || !isClientMounted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-12 text-center">Profile & Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Column 1: Profile View */}
        <div className="lg:col-span-1">
          {currentUser ? (
            <ProfileView currentUser={currentUser} />
          ) : (
            <Card className="shadow-lg h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <UserCircle className="h-6 w-6 text-primary" />
                    <CardTitle>Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center justify-center space-y-4">
                <p className="text-muted-foreground text-center">Please log in to view your profile and manage settings.</p>
                 <Button asChild className="w-full">
                    <Link href="/profile?redirect=/settings">Login / Sign Up</Link>
                 </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Column 2: Gemini API Key Configuration */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <KeyRound className="h-6 w-6 text-primary" />
                <CardTitle>Gemini API Key</CardTitle>
              </div>
              <CardDescription>
                Manage your Google Gemini API Key for AI features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
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
                    For server-side AI features, set this in <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.env</code> as <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">GOOGLE_API_KEY</code> and restart the server.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Advanced Features */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
              <CardDescription>Toggle experimental safety features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-grow">
              <AdvancedFeatureSetting
                id="panic-shake"
                icon={<SmartphoneNfc className="h-6 w-6" />}
                title="Panic Shake Activation"
                description="Trigger SOS by shaking your phone vigorously."
                note="Web simulation. Native app capabilities needed for full functionality."
              />
              <AdvancedFeatureSetting
                id="voice-recording"
                icon={<Mic className="h-6 w-6" />}
                title="Secret Voice Recording"
                description="Auto-start silent voice recording on SOS."
                note="Web simulation. Requires microphone access and native handling."
              />
              <AdvancedFeatureSetting
                id="photo-capture"
                icon={<Camera className="h-6 w-6" />}
                title="Silent Photo Capture"
                description="Capture background photo on SOS when triggered."
                note="Web simulation. Requires camera access and native handling."
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 text-center p-4 border-t border-dashed">
        <h2 className="text-xl font-semibold mb-2">Developer's Note</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Features like Panic Shake, background recording, and silent photo capture present significant technical and privacy challenges in web applications.
          Full implementation often requires native mobile application development. The toggles above are for demonstration and conceptual understanding.
          The API Key saved here is for browser-side use or easy copying to your <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.env</code> file for server-side features.
        </p>
      </div>
    </div>
  );
}


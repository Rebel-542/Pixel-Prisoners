
"use client";

import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { suggestSafeRoute, type SuggestSafeRouteInput, type SuggestSafeRouteOutput } from '@/ai/flows/suggest-safe-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Route, ShieldCheck, AlertTriangle, Wand2 } from 'lucide-react';
import Image from 'next/image';

const safeRouteSchema = z.object({
  startLocation: z.string().min(3, "Start location must be at least 3 characters"),
  endLocation: z.string().min(3, "End location must be at least 3 characters"),
});

type SafeRouteFormValues = z.infer<typeof safeRouteSchema>;

export function SafeRoutePlanner() {
  const [isPending, startTransition] = useTransition();
  const [routeSuggestion, setRouteSuggestion] = useState<SuggestSafeRouteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<SafeRouteFormValues>({
    resolver: zodResolver(safeRouteSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
    },
  });

  const onSubmit = (data: SafeRouteFormValues) => {
    startTransition(async () => {
      try {
        setRouteSuggestion(null); // Clear previous suggestions
        const result = await suggestSafeRoute(data as SuggestSafeRouteInput);
        setRouteSuggestion(result);
        toast({
          title: "Safe Route Suggested",
          description: "AI has generated a route suggestion for you.",
        });
      } catch (error) {
        console.error("Error suggesting safe route:", error);
        toast({
          title: "Error",
          description: "Failed to suggest a safe route. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> AI Safe Route Planner</CardTitle>
          <CardDescription>Enter your start and end locations to get an AI-powered safe route suggestion, prioritizing well-lit and populated areas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Main St, Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 456 Oak Ave, Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suggesting...
                  </>
                ) : (
                  <>
                    <Route className="mr-2 h-4 w-4" /> Suggest Safe Route
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="text-center py-4">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Finding the safest path for you...</p>
        </div>
      )}

      {routeSuggestion && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-6 w-6 text-green-500" /> Suggested Route</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Route Description:</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{routeSuggestion.routeDescription}</p>
            </div>
            {routeSuggestion.safetyConcerns && (
            <div>
              <h3 className="font-semibold text-lg mb-1 flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-orange-500" /> Safety Concerns:</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{routeSuggestion.safetyConcerns}</p>
            </div>
            )}
            <div className="w-full h-60 relative rounded-lg overflow-hidden bg-muted border" data-ai-hint="map route">
              <Image src="https://picsum.photos/seed/maproute/600/300" layout="fill" objectFit="cover" alt="Map placeholder showing route" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <p className="text-white text-xl font-semibold p-4 text-center">Route Visualization Placeholder</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Note: This is an AI-generated suggestion. Always use your judgment and be aware of your surroundings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

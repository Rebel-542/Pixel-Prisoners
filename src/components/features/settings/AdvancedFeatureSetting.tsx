
"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";
import { Info } from "lucide-react";

interface AdvancedFeatureSettingProps {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  note?: string;
  isProFeature?: boolean; // Example for future extension
}

export function AdvancedFeatureSetting({
  id,
  icon,
  title,
  description,
  note,
}: AdvancedFeatureSettingProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary">{icon}</span>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Switch id={id} aria-label={`Toggle ${title}`} />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        {note && (
          <p className="mt-3 text-xs text-muted-foreground bg-muted p-3 rounded-md flex items-start">
            <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
            <span>{note}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

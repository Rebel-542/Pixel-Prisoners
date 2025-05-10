
import { SafeRoutePlanner } from "@/components/features/safe-route/SafeRoutePlanner";

export default function SafeRoutePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Safe Route Suggestion</h1>
        <SafeRoutePlanner />
      </div>
    </div>
  );
}

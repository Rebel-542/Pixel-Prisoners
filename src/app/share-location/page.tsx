
import { LocationSharingManager } from "@/components/features/location-sharing/LocationSharingManager";

export default function ShareLocationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Share Your Location</h1>
        <LocationSharingManager />
      </div>
    </div>
  );
}

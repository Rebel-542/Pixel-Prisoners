
import { AdvancedFeatureSetting } from "@/components/features/settings/AdvancedFeatureSetting";
import { SmartphoneNfc, Mic, Camera } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Settings & Advanced Features</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
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
        </p>
      </div>
    </div>
  );
}

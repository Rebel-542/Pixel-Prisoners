
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Mic, Camera, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTrustedContacts, type TrustedContact } from '@/contexts/TrustedContactsContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SOSButtonProps {
  className?: string;
}

export function SOSButton({ className }: SOSButtonProps) {
  const { toast } = useToast();
  const { contacts } = useTrustedContacts();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (isSOSActive) {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation(position.coords);
            setLocationError(null);
            sendSOSMessages(position.coords, contacts);
          },
          (error) => {
            console.error("Error getting location: ", error);
            setLocationError(error.message);
            toast({
              title: "Location Error",
              description: "Could not get your location. SOS sent without location.",
              variant: "destructive",
            });
            sendSOSMessages(null, contacts); // Send SOS even if location fails
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
        toast({
          title: "Location Error",
          description: "Geolocation is not supported. SOS sent without location.",
          variant: "destructive",
        });
        sendSOSMessages(null, contacts); // Send SOS even if location fails
      }

      // Simulate voice recording and photo capture
      toast({
        title: "SOS Activated!",
        description: "Emergency alerts sent to trusted contacts.",
        duration: 5000,
      });
      toast({
        title: "Voice Recording",
        description: (
          <div className="flex items-center">
            <Mic className="mr-2 h-4 w-4" /> Recording started (simulation)...
          </div>
        ),
        duration: 5000,
      });
      toast({
        title: "Photo Capture",
        description: (
          <div className="flex items-center">
            <Camera className="mr-2 h-4 w-4" /> Background photo captured (simulation)...
          </div>
        ),
        duration: 5000,
      });

      // TODO: Implement actual voice recording and photo capture & Firebase upload here
    }
  }, [isSOSActive, toast, contacts]);

  const sendSOSMessages = (location: GeolocationCoordinates | null, trustedContacts: TrustedContact[]) => {
    if (trustedContacts.length === 0) {
      toast({
        title: "No Trusted Contacts",
        description: "Please add trusted contacts to send SOS alerts.",
        variant: "destructive",
      });
      setIsSOSActive(false); // Reset SOS if no contacts
      return;
    }

    const locationLink = location
      ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
      : "Location not available.";
    
    const message = `SOS! I need help! My current location: ${locationLink}`;

    trustedContacts.forEach(contact => {
      // Simulate sending SMS
      console.log(`Simulating SMS to ${contact.name} (${contact.phoneNumber}): ${message}`);
      toast({
        title: "Alert Sent",
        description: (
            <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> Alert sent to ${contact.name} (simulation).
            </div>
        ),
      });
    });
  };

  const handleSOSActivation = () => {
    if (contacts.length === 0) {
       toast({
        title: "No Trusted Contacts",
        description: "Please add trusted contacts before activating SOS.",
        variant: "destructive",
      });
      return;
    }
    setIsSOSActive(true);
  };
  
  const handleCancelSOS = () => {
    setIsSOSActive(false);
    setCurrentLocation(null);
    setLocationError(null);
    toast({
      title: "SOS Canceled",
      description: "SOS alerts have been stopped.",
    });
  };


  if (isSOSActive) {
    return (
       <div className="flex flex-col items-center gap-4">
        <Button
          variant="default"
          size="lg"
          className={`bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-10 px-12 rounded-full shadow-lg animate-pulse ${className}`}
          onClick={handleCancelSOS}
        >
          <ShieldAlert className="mr-2 h-10 w-10" /> SOS ACTIVE - TAP TO CANCEL
        </Button>
        {locationError && <p className="text-destructive">Location Error: {locationError}</p>}
        {currentLocation && (
          <p className="text-sm text-muted-foreground">
            Location: {currentLocation.latitude.toFixed(5)}, {currentLocation.longitude.toFixed(5)}
          </p>
        )}
      </div>
    );
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className={`bg-accent hover:bg-red-700 text-accent-foreground text-2xl font-bold py-10 px-12 rounded-full shadow-lg hover:shadow-xl transition-shadow ${className}`}
        >
          <ShieldAlert className="mr-3 h-10 w-10" /> SOS
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Activate SOS?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately send an alert with your current location to all your trusted contacts.
            {contacts.length === 0 && <span className="block text-destructive font-semibold mt-2">You have no trusted contacts. Please add contacts first.</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleSOSActivation} 
            className="bg-accent hover:bg-red-700 text-accent-foreground"
            disabled={contacts.length === 0}
          >
            Activate SOS
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

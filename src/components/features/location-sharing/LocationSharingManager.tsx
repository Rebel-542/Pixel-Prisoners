
"use client";

import { useState, useEffect } from 'react';
import { useTrustedContacts, type TrustedContact } from '@/contexts/TrustedContactsContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin, PlayCircle, StopCircle, Clock, Users, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

const DURATION_OPTIONS = [
  { value: '15', label: '15 Minutes' },
  { value: '30', label: '30 Minutes' },
  { value: '60', label: '1 Hour' },
  { value: '120', label: '2 Hours' },
  { value: '0', label: 'Indefinitely' }, // 0 for indefinite
];

export function LocationSharingManager() {
  const { contacts } = useTrustedContacts();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>(DURATION_OPTIONS[1].value); // Default to 30 mins
  const [isSharing, setIsSharing] = useState(false);
  const [sharingEndTime, setSharingEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isSharing && sharingEndTime) {
      const updateTimer = () => {
        const now = Date.now();
        if (now >= sharingEndTime) {
          setIsSharing(false);
          setSharingEndTime(null);
          setTimeLeft('');
          toast({ title: 'Location Sharing Ended', description: 'Sharing duration expired.' });
          // Reset current location when sharing stops
          setCurrentLocation(null);
        } else {
          const diff = sharingEndTime - now;
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      };
      updateTimer(); // Initial call
      intervalId = setInterval(updateTimer, 1000);
    } else if (isSharing && duration === '0') { // Indefinite sharing
      setTimeLeft('Sharing indefinitely');
    }
    return () => clearInterval(intervalId);
  }, [isSharing, sharingEndTime, duration, toast]);
  
  useEffect(() => {
    // Simulate location updates when sharing
    let locationIntervalId: NodeJS.Timeout;
    if (isSharing) {
      if (navigator.geolocation) {
        const updateLocation = () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            (error) => {
              console.error("Error getting location for sharing: ", error);
              toast({
                title: "Location Update Failed",
                description: "Could not update your location.",
                variant: "destructive",
              });
            }
          );
        };
        updateLocation(); // Initial fetch
        locationIntervalId = setInterval(updateLocation, 30000); // Update every 30 seconds
      } else {
         toast({
            title: "Geolocation Error",
            description: "Geolocation is not supported by this browser.",
            variant: "destructive",
          });
      }
    } else {
      setCurrentLocation(null); // Clear location when not sharing
    }
    return () => clearInterval(locationIntervalId);
  }, [isSharing, toast]);

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    );
  };

  const handleStartSharing = () => {
    if (selectedContacts.length === 0) {
      toast({ title: 'No Contacts Selected', description: 'Please select at least one contact.', variant: 'destructive' });
      return;
    }
    setIsSharing(true);
    const durationMs = parseInt(duration, 10) * 60 * 1000;
    if (durationMs > 0) {
      setSharingEndTime(Date.now() + durationMs);
    } else {
      setSharingEndTime(null); // Indefinite
    }

    const sharedWithNames = contacts.filter(c => selectedContacts.includes(c.id)).map(c => c.name).join(', ');
    toast({ 
      title: 'Location Sharing Started', 
      description: `Sharing with: ${sharedWithNames}. ${duration === '0' ? 'Sharing indefinitely.' : `Duration: ${DURATION_OPTIONS.find(d => d.value === duration)?.label}.`}`
    });
    // Simulate notification to contacts
    console.log(`Simulating notification to contacts: ${sharedWithNames} about location sharing.`);
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    setSharingEndTime(null);
    setTimeLeft('');
    setSelectedContacts([]); // Optionally reset selected contacts
    toast({ title: 'Location Sharing Stopped', description: 'You are no longer sharing your location.' });
  };

  if (contacts.length === 0) {
    return (
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center"><AlertTriangle className="mr-2 h-6 w-6 text-destructive" /> No Trusted Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You need to add trusted contacts before you can share your location.
          </p>
          <Button asChild>
            <a href="/contacts">Add Contacts</a>
          </Button>
        </CardContent>
      </Card>
    );
  }


  if (isSharing) {
    return (
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center"><MapPin className="mr-2 h-6 w-6 text-primary animate-pulse" /> Sharing Location</CardTitle>
          {timeLeft && <CardDescription className="text-lg font-semibold mt-2"><Clock className="inline mr-1 h-5 w-5" /> {timeLeft}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
           {currentLocation ? (
             <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">Current Location (Simulated):</p>
                <p className="font-mono text-xs">Lat: {currentLocation.lat.toFixed(5)}, Lng: {currentLocation.lng.toFixed(5)}</p>
                <a 
                    href={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                >
                    View on Google Maps
                </a>
             </div>
           ) : (
            <p className="text-muted-foreground">Fetching location...</p>
           )}
          <p className="text-muted-foreground">
            Sharing with: {contacts.filter(c => selectedContacts.includes(c.id)).map(c => c.name).join(', ') || 'No one selected'}
          </p>
          <Button onClick={handleStopSharing} variant="destructive" size="lg" className="w-full">
            <StopCircle className="mr-2 h-5 w-5" /> Stop Sharing
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Users className="mr-2 h-6 w-6 text-primary" /> Select Contacts</CardTitle>
        <CardDescription>Choose who you want to share your location with.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 max-h-60 overflow-y-auto p-1 border rounded-md">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center space-x-3 p-2 rounded hover:bg-muted">
              <Checkbox
                id={`contact-${contact.id}`}
                checked={selectedContacts.includes(contact.id)}
                onCheckedChange={() => handleContactToggle(contact.id)}
              />
              <Label htmlFor={`contact-${contact.id}`} className="flex-grow cursor-pointer">
                <span className="font-medium">{contact.name}</span>
                <span className="text-xs text-muted-foreground block">{contact.phoneNumber}</span>
              </Label>
            </div>
          ))}
        </div>

        <div>
          <Label htmlFor="duration-select" className="flex items-center mb-2"><Clock className="mr-2 h-5 w-5 text-primary" /> Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="duration-select">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleStartSharing} size="lg" className="w-full" disabled={selectedContacts.length === 0}>
          <PlayCircle className="mr-2 h-5 w-5" /> Start Sharing
        </Button>
        <div className="w-full h-48 relative rounded-lg overflow-hidden bg-muted" data-ai-hint="map illustration">
          <Image src="https://picsum.photos/seed/mapshare/400/200" layout="fill" objectFit="cover" alt="Map placeholder" />
           <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="text-white text-lg font-semibold">Map Area Placeholder</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

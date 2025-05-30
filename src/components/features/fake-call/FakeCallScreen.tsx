
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, PhoneOff, UserCircle2 } from 'lucide-react';
import Image from 'next/image';

interface FakeCallScreenProps {
  onEndCall: () => void;
}

const callers = [
  { name: "Mom", avatarSeed: "mom" },
  { name: "Work", avatarSeed: "work" },
  { name: "Alex", avatarSeed: "alex" },
  { name: "Unknown Caller", avatarSeed: "unknown" },
];

// IMPORTANT: Create an audio file (e.g., mp3, wav) and place it in the `public/audio` directory.
// For example, if your file is `ringtone.mp3`, the path would be `/audio/ringtone.mp3`.
const RINGTONE_PATH = "/audio/default-ringtone.mp3"; // Update this path if needed

export function FakeCallScreen({ onEndCall }: FakeCallScreenProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [caller, setCaller] = useState({ name: "Mom", avatarSeed: "mom" });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Select a random caller when component mounts
    setCaller(callers[Math.floor(Math.random() * callers.length)]);
  }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCallActive) {
      setCallDuration(0); // Reset duration on new call accept
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(RINGTONE_PATH);
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (!isCallActive) { // Incoming call state
      audio.play().catch(error => {
        console.error("Error playing ringtone:", error);
        // You might want to inform the user if autoplay is blocked,
        // though typically interaction (clicking to start fake call) should allow it.
      });
    } else { // Call is active (accepted)
      audio.pause();
      audio.currentTime = 0; // Reset audio to the beginning
    }

    // Cleanup function: stop audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isCallActive]);


  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleAcceptCall = () => {
    setIsCallActive(true);
    // Ringtone will stop due to the useEffect dependency on isCallActive
  };

  const handleRejectOrEndCall = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsCallActive(false); // Though this might re-trigger the useEffect, onEndCall will usually unmount
    onEndCall();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 text-white flex flex-col items-center justify-center z-[100] p-4">
      <div className="w-full max-w-sm bg-gray-700 rounded-xl shadow-2xl p-6 flex flex-col items-center">
        <Avatar className="w-32 h-32 mb-6 border-4 border-gray-600">
          <AvatarImage src={`https://picsum.photos/seed/${caller.avatarSeed}/200`} alt={caller.name} data-ai-hint="person portrait" />
          <AvatarFallback>
            <UserCircle2 className="w-20 h-20 text-gray-400" />
          </AvatarFallback>
        </Avatar>

        <h2 className="text-3xl font-semibold mb-1">{caller.name}</h2>
        
        {isCallActive ? (
          <>
            <p className="text-lg text-gray-300 mb-8">{formatDuration(callDuration)}</p>
            <Button
              onClick={handleRejectOrEndCall}
              variant="destructive"
              size="lg"
              className="rounded-full w-20 h-20 p-0"
            >
              <PhoneOff className="w-8 h-8" />
              <span className="sr-only">End Call</span>
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-300 mb-12">Incoming Call...</p>
            <div className="flex justify-around w-full">
              <Button
                onClick={handleRejectOrEndCall}
                variant="destructive"
                size="lg"
                className="rounded-full w-20 h-20 p-0"
              >
                <PhoneOff className="w-8 h-8" />
                 <span className="sr-only">Decline Call</span>
              </Button>
              <Button
                onClick={handleAcceptCall}
                variant="default"
                size="lg"
                className="bg-green-500 hover:bg-green-600 rounded-full w-20 h-20 p-0"
              >
                <Phone className="w-8 h-8" />
                <span className="sr-only">Accept Call</span>
              </Button>
            </div>
          </>
        )}
         <p className="text-xs text-gray-400 mt-10">Guardian Angel - Fake Call</p>
      </div>
    </div>
  );
}

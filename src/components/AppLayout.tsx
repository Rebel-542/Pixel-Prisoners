
"use client";
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, MapPin, Route, PhoneCall, Settings, Menu, Instagram, Twitter, Facebook, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: <ShieldCheck className="h-5 w-5" /> },
  { href: '/contacts', label: 'Contacts', icon: <Users className="h-5 w-5" /> },
  { href: '/share-location', label: 'Share Location', icon: <MapPin className="h-5 w-5" /> },
  { href: '/safe-route', label: 'Safe Route', icon: <Route className="h-5 w-5" /> },
  { href: '/fake-call', label: 'Fake Call', icon: <PhoneCall className="h-5 w-5" /> },
  { href: '/profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  { href: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
];

const AppHeader = () => {
  const { currentUser, logOut, loading } = useAuth();

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'GA'; 
    return email.substring(0, 2).toUpperCase();
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Guardian Angel</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Link href={item.href} className="font-medium transition-colors px-3 py-2 rounded-md">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
             <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
          ) : currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    {/* <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || currentUser.email || "User"} /> */}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(currentUser.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser.displayName || currentUser.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Signed In
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Explicit "Login / Sign Up" button removed from here.
            // The "Profile" link in navItems serves as the entry point to the login/signup page.
            null
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                       <ShieldCheck className="h-7 w-7 text-primary" />
                       <span className="text-lg font-bold">Guardian Angel</span>
                    </Link>
                    <nav className="flex flex-col space-y-1">
                      {navItems.map((item) => (
                        <Button key={item.href} variant="ghost" className="justify-start w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
                           <Link href={item.href} className="flex items-center gap-3 text-md w-full px-3 py-2 rounded-md">
                            {item.icon}
                            {item.label}
                          </Link>
                        </Button>
                      ))}
                    </nav>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-4 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-col">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-center">
            Guardian Angel 2025 Stay Safe
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">Contact Us</p>
            <div className="flex items-center space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" /> 
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

    

    
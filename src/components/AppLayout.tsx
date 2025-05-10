import type { ReactNode } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, MapPin, Route, PhoneCall, Settings, Menu, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

// Snapchat icon as SVG since it's not in lucide-react
const SnapchatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12S6.75 21.5 12 21.5c2.5 0 4.75-1 6.5-2.5L20.5 22V10.5c0-4.25-3-7.5-6.5-7.5h-2zm0 3c.5 0 .75.25.75.75v1.5c0 .5-.25.75-.75.75s-.75-.25-.75-.75V6.25c0-.5.25-.75.75-.75zm4 0c.5 0 .75.25.75.75v1.5c0 .5-.25.75-.75.75s-.75-.25-.75-.75V6.25c0-.5.25-.75.75-.75zm-8 4c.5 0 .75.25.75.75v4c0 .5-.25.75-.75.75s-.75-.25-.75-.75v-4c0-.5.25-.75.75-.75zm8 0c.5 0 .75.25.75.75v4c0 .5-.25.75-.75.75s-.75-.25-.75-.75v-4c0-.5.25-.75.75-.75z"/>
  </svg>
);


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
  { href: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
];

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Guardian Angel</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
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
                  <nav className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <Button key={item.href} variant="ghost" className="justify-start" asChild>
                         <Link href={item.href} className="flex items-center gap-3 text-md">
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
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-col">
          <p className="text-center text-sm leading-loose text-muted-foreground">
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
                <SnapchatIcon />
                <span className="sr-only">Snapchat</span>
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

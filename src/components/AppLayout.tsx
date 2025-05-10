import type { ReactNode } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, MapPin, Route, PhoneCall, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Guardian Angel &copy; {new Date().getFullYear()}. Stay Safe.
          </p>
        </div>
      </footer>
    </div>
  );
}

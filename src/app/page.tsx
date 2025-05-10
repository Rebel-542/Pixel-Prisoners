
import Link from 'next/link';
import { SOSButton } from '@/components/features/sos/SOSButton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Route, PhoneCall, Settings, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  cta: string;
}

const FeatureCard = ({ title, description, link, icon, cta }: FeatureCardProps) => (
  <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-start gap-4 pb-4">
      <div className="bg-primary/10 p-3 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-end">
      <Button asChild variant="outline" className="w-full mt-auto">
        <Link href={link} className="flex items-center justify-center">
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary tracking-tight">Welcome to Guardian Angel</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Empowering Safety, Anytime, Anywhere.
        </p>
        <SOSButton className="mx-auto" />
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Trusted Contacts"
            description="Manage your emergency contacts."
            link="/contacts"
            icon={<Users className="h-8 w-8" />}
            cta="Manage Contacts"
          />
          <FeatureCard
            title="Share Location"
            description="Share your real-time location."
            link="/share-location"
            icon={<MapPin className="h-8 w-8" />}
            cta="Share Location"
          />
          <FeatureCard
            title="Safe Route"
            description="Get AI-powered safe route suggestions."
            link="/safe-route"
            icon={<Route className="h-8 w-8" />}
            cta="Find Route"
          />
          <FeatureCard
            title="Fake Call"
            description="Simulate a call to exit tricky situations."
            link="/fake-call"
            icon={<PhoneCall className="h-8 w-8" />}
            cta="Simulate Call"
          />
          <FeatureCard
            title="Settings & Advanced"
            description="Configure advanced safety features."
            link="/settings"
            icon={<Settings className="h-8 w-8" />}
            cta="Go to Settings"
          />
           <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 items-center justify-center p-6 bg-secondary/30" data-ai-hint="woman safety">
            <Image src="https://storage.googleapis.com/aai-web-samples/safety-app.jpg" alt="Safety illustration of a woman holding a phone with a shield icon" width={300} height={200} className="rounded-lg mb-4 object-cover" />
            <CardTitle className="text-xl text-center">Your Safety, Our Priority</CardTitle>
            <CardDescription className="text-center mt-2">We are committed to helping you stay safe.</CardDescription>
          </Card>
        </div>
      </section>
    </div>
  );
}


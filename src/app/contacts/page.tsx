
"use client";

import { useAuth } from '@/hooks/useAuth';
import { ContactForm } from "@/components/features/contacts/ContactForm";
import { ContactList } from "@/components/features/contacts/ContactList";
import { useTrustedContacts } from "@/contexts/TrustedContactsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Loader2, Users } from 'lucide-react';

export default function ContactsPage() {
  const { addContact } = useTrustedContacts();
  const { currentUser, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 text-primary">
              <Users className="h-12 w-12" />
            </div>
            <CardTitle>Manage Your Trusted Contacts</CardTitle>
            <CardDescription>
              Please log in or create an account to add, view, and manage your emergency contacts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full">
              <Link href="/profile?redirect=/contacts">Login / Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Trusted Contacts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Add New Contact</CardTitle>
            <CardDescription>Enter the details of the person you trust.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm onSubmit={addContact} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
           <CardHeader>
            <CardTitle>Your Contacts</CardTitle>
            <CardDescription>View and manage your list of trusted contacts.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


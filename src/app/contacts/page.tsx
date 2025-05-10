
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

  // Content is now shown even if !currentUser.
  // Specific actions like adding/editing contacts will add to localStorage.
  // If these actions need to be restricted to logged-in users and stored in a backend,
  // the respective components (ContactForm, ContactList) would need to handle that.

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Trusted Contacts</h1>
      
      {!currentUser && (
        <Card className="mb-8 shadow-lg border-primary/50 bg-primary/5">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3 text-primary">
                <Users className="h-8 w-8" />
            </div>
            <CardTitle>Login to Manage Contacts Securely</CardTitle>
            <CardDescription>
              To save your contacts to your account and access them across devices, please log in. Contacts added while logged out are saved locally in this browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg">
              <Link href="/profile?redirect=/contacts">Login / Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      )}

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
            <CardDescription>View and manage your list of trusted contacts{currentUser ? "" : " (stored locally)"}.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

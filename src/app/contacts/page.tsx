
"use client";

import { ContactForm } from "@/components/features/contacts/ContactForm";
import { ContactList } from "@/components/features/contacts/ContactList";
import { useTrustedContacts } from "@/contexts/TrustedContactsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactsPage() {
  const { addContact } = useTrustedContacts();

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

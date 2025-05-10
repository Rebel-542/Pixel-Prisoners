
"use client";

import { useState } from 'react';
import type { TrustedContact } from "@/contexts/TrustedContactsContext";
import { useTrustedContacts } from "@/contexts/TrustedContactsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Edit3, User, Phone } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { useToast } from '@/hooks/use-toast';


export function ContactList() {
  const { contacts, deleteContact, updateContact } = useTrustedContacts();
  const [editingContact, setEditingContact] = useState<TrustedContact | null>(null);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    deleteContact(id);
    toast({
      title: "Contact Deleted",
      description: "The contact has been removed.",
    });
  };

  const handleUpdate = (data: { name: string; phoneNumber: string }) => {
    if (editingContact) {
      updateContact({ ...editingContact, ...data });
      setEditingContact(null); // Close dialog implicitly by resetting state
      // Toast is handled within ContactForm
    }
  };

  if (contacts.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No trusted contacts yet. Add some to get started!</p>;
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <Card key={contact.id} className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center text-lg">
                  <User className="mr-2 h-5 w-5 text-primary" /> {contact.name}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" /> {contact.phoneNumber}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Dialog open={editingContact?.id === contact.id} onOpenChange={(isOpen) => !isOpen && setEditingContact(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setEditingContact(contact)}>
                      <Edit3 className="h-4 w-4" />
                      <span className="sr-only">Edit Contact</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Contact</DialogTitle>
                    </DialogHeader>
                    {editingContact?.id === contact.id && ( // Ensure form is rendered only when this dialog is for current contact
                        <ContactForm
                        onSubmit={handleUpdate}
                        initialData={editingContact}
                        buttonText="Save Changes"
                        />
                    )}
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete Contact</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {contact.name} from your trusted contacts.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(contact.id)} className="bg-destructive hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

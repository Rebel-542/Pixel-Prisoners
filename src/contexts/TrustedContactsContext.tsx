
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export interface TrustedContact {
  id: string;
  name: string;
  phoneNumber: string;
}

interface TrustedContactsContextType {
  contacts: TrustedContact[];
  addContact: (contact: Omit<TrustedContact, 'id'>) => void;
  updateContact: (contact: TrustedContact) => void;
  deleteContact: (id: string) => void;
  getContactById: (id: string) => TrustedContact | undefined;
}

const TrustedContactsContext = createContext<TrustedContactsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'guardianAngelContacts';

export const TrustedContactsProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error("Failed to load contacts from localStorage:", error);
      // Initialize with empty array if parsing fails or localStorage is not available
      setContacts([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      } catch (error) {
        console.error("Failed to save contacts to localStorage:", error);
      }
    }
  }, [contacts, isLoaded]);

  const addContact = (contact: Omit<TrustedContact, 'id'>) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...contact, id: crypto.randomUUID() },
    ]);
  };

  const updateContact = (updatedContact: TrustedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const deleteContact = (id: string) => {
    setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
  };
  
  const getContactById = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  if (!isLoaded) {
    // You can return a loading spinner or null here
    return null; 
  }

  return (
    <TrustedContactsContext.Provider value={{ contacts, addContact, updateContact, deleteContact, getContactById }}>
      {children}
    </TrustedContactsContext.Provider>
  );
};

export const useTrustedContacts = () => {
  const context = useContext(TrustedContactsContext);
  if (context === undefined) {
    throw new Error('useTrustedContacts must be used within a TrustedContactsProvider');
  }
  return context;
};

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export type UserType = "PARENT" | "CHILD" | null;

interface UserState {
  userType: UserType;
  age: number | null; // For child users
  id?: string;
  name?: string;
  email?: string;
}

interface UserContextType extends UserState {
  logout: () => void;
  isLoading: boolean;
}

const defaultUserState: UserState = {
  userType: null,
  age: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState>(defaultUserState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (status === 'authenticated' && session?.user) {
      // Extract age from dateOfBirth if available
      let age = null;
      
      setUser({
        userType: session.user.userType as UserType,
        age,
        id: session.user.id,
        name: session.user.name,
        email: session.user.email
      });
    } else {
      setUser(defaultUserState);
    }
    
    setIsLoading(false);
  }, [session, status]);

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(defaultUserState);
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ ...user, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 
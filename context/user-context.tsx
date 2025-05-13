"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserType = "PARENT" | "CHILD" | null;

interface UserState {
  userType: UserType;
  age: number | null; // For child users
}

interface UserContextType extends UserState {
  loginAsTestUser: (userCategory: "PARENT" | "CHILD_7" | "CHILD_13") => void;
  logout: () => void;
  // You can add a real setUser function here if you integrate with an actual auth provider later
}

const defaultUserState: UserState = {
  userType: null,
  age: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState>(defaultUserState);
  const router = useRouter();

  const loginAsTestUser = (userCategory: "PARENT" | "CHILD_7" | "CHILD_13") => {
    let newUserState: UserState = { userType: null, age: null };
    if (userCategory === "PARENT") {
      newUserState = { userType: "PARENT", age: null };
    } else if (userCategory === "CHILD_7") {
      newUserState = { userType: "CHILD", age: 7 };
    } else if (userCategory === "CHILD_13") {
      newUserState = { userType: "CHILD", age: 13 };
    }
    setUser(newUserState);
    // For now, let's assume successful "login" navigates to educational resources
    // In a real app, this might come after a successful Firebase/NextAuth sign-in
    router.push('/educational-resources'); 
    // You might want to refresh other parts of the app or use router.replace
  };

  const logout = () => {
    setUser(defaultUserState);
    // Navigate to login or home page after logout
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ ...user, loginAsTestUser, logout }}>
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
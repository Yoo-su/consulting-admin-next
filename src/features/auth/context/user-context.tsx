'use client';

import { useState, createContext } from 'react';
import { User } from '../types';

export type UserContextValue = {
  user: User | null;
};
const UserContext = createContext<UserContextValue | undefined>(undefined);

export type UserProviderProps = {
  children: React.ReactNode;
};
const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<{ user: User }>({
    user: {
      name: '유수현',
      userID: 'yoosu',
      role: 'developer',
    },
  });
  return (
    <UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
const UserConsumer = UserContext.Consumer;
export { UserContext, UserConsumer };

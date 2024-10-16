'use client';

import { useContext } from 'react';

import { UserContextValue, UserContext } from '../../contexts/user-context';

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

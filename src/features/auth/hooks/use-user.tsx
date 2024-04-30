import { useContext } from 'react';

import type { UserContextValue } from '../context/user-context';
import { UserContext } from '../context/user-context';

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

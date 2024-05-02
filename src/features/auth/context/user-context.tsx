"use client";

import { useEffect, useState, useCallback, createContext } from "react";
import { User } from "../types";

export type UserContextValue = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};
const UserContext = createContext<UserContextValue | undefined>(undefined);

export type UserProviderProps = {
  children: React.ReactNode;
};
const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState<
    Pick<UserContextValue, "user" | "isLoading">
  >({
    user: null,
    isLoading: true,
  });

  const setUser = (user: User | null) => {
    setState((prev) => ({ ...prev, user: user ?? null, isLoading: false }));
  };

  const checkSession = useCallback(() => {
    const user = sessionStorage.getItem("user");
    user ? setUser(JSON.parse(user)) : setUser(null);
  }, []);

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
const UserConsumer = UserContext.Consumer;
export { UserContext, UserConsumer };

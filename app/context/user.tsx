// contexts/UserContext.tsx

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError, Session, User, UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import useIsLoading from "../hooks/useIsLoading";

type UserContextProps = {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const signIn = async (email: string, password: string) => {
    // const { user, session, error } = await supabase.auth.signIn({
    //   email,
    //   password,
    // });
    // if (error) {
    //   console.error("Error signing in:", error.message);
    //   throw error;
    // }
    // setUser(user);
    // setSession(session);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
      setSession(null);
      router.push('/');
  };

  const getCurrentUser = async () => {
    const response = await supabase.auth.getUser();
    if (response.data.user) {
        setUser(response.data.user);
    }
  };

  const getSession = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
        setSession(session.data.session);
        return session.data.session
    }
      setUser(null);
      setSession(null)
      return null
  };

  useEffect(() => {
    const isUser = async () => {
      const session = await getSession();
      if (session) {
        await getCurrentUser();
      }
    };
      isUser();
  });
    

  const contextValue: UserContextProps = {
    user,
    session,
    signIn,
    signOut,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

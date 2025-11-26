"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "@taskmaster/core";
import useLocalStorage from "../hooks/use-local-storage.hook";

interface Session {
  token: string | null;
  user: User | null;
}

interface SessionContextProps {
  loading: boolean;
  token: string | null;
  user: User | null;
  startSession: (token: string) => void;
  endSession: () => void;
}

const SessionContext = createContext<SessionContextProps>({} as any);
export default SessionContext;

export function SessionProvider(props: any) {
  const key = "_taskmaster_auth";
  const { get, set, remove } = useLocalStorage();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session>({ token: null, user: null });

  const getSession = useCallback(
    async function (): Promise<Session> {
      const token = await get(key);

      if (!token) {
        return { token: null, user: null };
      }

      try {
        const payload: any = jwtDecode(token);
        const valid = payload.exp! > Date.now() / 1000;

        if (!valid) {
          return { token: null, user: null };
        }

        return {
          token,
          user: new User({
            id: payload.id,
            name: payload.name,
            email: payload.email,
          }),
        };
      } catch {
        return { token: null, user: null };
      }
    },
    [get, key]
  );

  const loadSession = useCallback(
    async function () {
      try {
        setLoading(true);
        const s = await getSession();
        setSession(s);
      } finally {
        setLoading(false);
      }
    },
    [getSession]
  );

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  async function startSession(token: string) {
    set(key, token);
    const s = await getSession();
    setSession(s);
  }

  async function endSession() {
    await remove(key);
    setSession({ token: null, user: null });
  }

  return (
    <SessionContext.Provider
      value={{
        loading,
        token: session.token,
        user: session.user,
        startSession,
        endSession,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}

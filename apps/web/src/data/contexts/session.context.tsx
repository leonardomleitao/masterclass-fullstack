"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "@taskmaster/core";
import cookie from "js-cookie";

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
  const cookieName = "_taskmaster_token";

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session>({ token: null, user: null });

  const loadSession = useCallback(function () {
    try {
      setLoading(true);
      const s = getSession();
      setSession(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  function startSession(token: string) {
    cookie.set(cookieName, token, { expires: 1 });
    const s = getSession();
    setSession(s);
  }

  function endSession() {
    cookie.remove(cookieName);
    setSession({ token: null, user: null });
  }

  function getSession(): Session {
    const token = cookie.get(cookieName);

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

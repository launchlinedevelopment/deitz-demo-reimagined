import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Demo-only access gate. This is presentation access control for a sales
 * demonstration — not production-grade security.
 */
const DEMO_PASSWORD = "Launchline2026!";
const STORAGE_KEY = "launchline-demo-access";

type DemoAccessValue = {
  unlocked: boolean;
  ready: boolean;
  attempt: (value: string) => boolean;
};

const DemoAccessContext = createContext<DemoAccessValue>({
  unlocked: false,
  ready: false,
  attempt: () => false,
});

export function DemoAccessProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(STORAGE_KEY) === "granted");
    } catch {
      /* sessionStorage unavailable — stay locked */
    }
    setReady(true);
  }, []);

  const attempt = useCallback((value: string) => {
    if (value !== DEMO_PASSWORD) return false;
    setUnlocked(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "granted");
    } catch {
      /* ignore */
    }
    return true;
  }, []);

  const value = useMemo(() => ({ unlocked, ready, attempt }), [unlocked, ready, attempt]);
  return <DemoAccessContext.Provider value={value}>{children}</DemoAccessContext.Provider>;
}

export function useDemoAccess() {
  return useContext(DemoAccessContext);
}

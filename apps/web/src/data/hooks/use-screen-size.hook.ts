import { useEffect, useMemo, useState } from "react";

type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
};

type BreakpointFlags = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  "2xl": boolean;
};

const DEFAULT_BP: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type Options = { breakpoints?: Partial<Breakpoints> };

export function useScreenSize(opts: Options = {}): BreakpointFlags {
  const bp = useMemo<Breakpoints>(
    () => ({ ...DEFAULT_BP, ...(opts.breakpoints || {}) }),
    [opts.breakpoints]
  );

  const queries = useMemo(() => {
    const eps = 0.02;
    return {
      xs: `(max-width: ${bp.sm - eps}px)`,
      sm: `(min-width: ${bp.sm}px) and (max-width: ${bp.md - eps}px)`,
      md: `(min-width: ${bp.md}px) and (max-width: ${bp.lg - eps}px)`,
      lg: `(min-width: ${bp.lg}px) and (max-width: ${bp.xl - eps}px)`,
      xl: `(min-width: ${bp.xl}px) and (max-width: ${bp["2xl"] - eps}px)`,
      "2xl": `(min-width: ${bp["2xl"]}px)`,
    } as const;
  }, [bp]);

  const getMatches = () => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        "2xl": false,
      } as BreakpointFlags;
    }
    return {
      xs: window.matchMedia(queries.xs).matches,
      sm: window.matchMedia(queries.sm).matches,
      md: window.matchMedia(queries.md).matches,
      lg: window.matchMedia(queries.lg).matches,
      xl: window.matchMedia(queries.xl).matches,
      "2xl": window.matchMedia(queries["2xl"]).matches,
    } as BreakpointFlags;
  };

  const [state, setState] = useState<BreakpointFlags>(() => getMatches());

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    )
      return;

    const mqls = {
      xs: window.matchMedia(queries.xs),
      sm: window.matchMedia(queries.sm),
      md: window.matchMedia(queries.md),
      lg: window.matchMedia(queries.lg),
      xl: window.matchMedia(queries.xl),
      "2xl": window.matchMedia(queries["2xl"]),
    } as const;

    const handler = () => setState(getMatches());

    // atualiza inicialmente para evitar algum descompasso
    handler();

    // registra listeners
    Object.values(mqls).forEach((mql) => {
      if ("addEventListener" in mql) mql.addEventListener("change", handler);
      else (mql as any).addListener?.(handler); // fallback
    });

    return () => {
      Object.values(mqls).forEach((mql) => {
        if ("removeEventListener" in mql)
          mql.removeEventListener("change", handler);
        else (mql as any).removeListener?.(handler);
      });
    };
  }, [
    queries.xs,
    queries.sm,
    queries.md,
    queries.lg,
    queries.xl,
    queries["2xl"],
  ]);

  return state;
}

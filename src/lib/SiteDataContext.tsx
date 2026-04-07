"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteData } from "./site-data";

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({
  data,
  children,
}: {
  data: SiteData;
  children: ReactNode;
}) {
  return (
    <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}

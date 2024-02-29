import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InstanceState {
  searXNGDomain: string;
  setSearXNGDomain: (domain: string) => void;

  nominatimDomain: string;
  setNominatimDomain: (domain: string) => void;
}

export const useInstanceStore = create<InstanceState>()(
  persist(
    (set) => ({
      searXNGDomain: process.env.SEARXNG_URL || "",
      setSearXNGDomain: (domain) => set({ searXNGDomain: domain }),

      nominatimDomain: process.env.NOMINATIM_URL || "",
      setNominatimDomain: (domain) => set({ nominatimDomain: domain }),
    }),
    {
      name: "instance-store", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        searXNGDomain: state.searXNGDomain,
        nominatimDomain: state.nominatimDomain,
      }),
    }
  )
);

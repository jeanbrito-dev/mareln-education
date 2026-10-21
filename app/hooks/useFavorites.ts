"use client";

import { useMemo, useSyncExternalStore } from "react";

const FAVORITES_KEY = "mareln_favorites";
const FAVORITES_EVENT = "mareln-favorites-changed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(FAVORITES_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FAVORITES_EVENT, callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(FAVORITES_KEY) ?? "[]";
}

function saveFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function useFavorites() {
  const storedFavorites = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const favorites = useMemo(() => {
    try {
      return JSON.parse(storedFavorites) as string[];
    } catch {
      return [];
    }
  }, [storedFavorites]);

  return {
    favorites,
    toggleFavorite: (eventId: string) => {
      saveFavorites(
        favorites.includes(eventId)
          ? favorites.filter((id) => id !== eventId)
          : [...favorites, eventId],
      );
    },
    removeFavorite: (eventId: string) => {
      saveFavorites(favorites.filter((id) => id !== eventId));
    },
  };
}

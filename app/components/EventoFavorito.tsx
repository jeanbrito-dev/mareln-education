'use client';

import { useSyncExternalStore } from 'react';

interface EventoFavoritoProps {
  eventId: string;
}

const FAVORITES_KEY = 'mareln_favorites';

function subscribeFavorites(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('mareln_favorites_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('mareln_favorites_updated', callback);
  };
}

function getFavoritesSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  return localStorage.getItem(FAVORITES_KEY) || '[]';
}

function getFavoritesServerSnapshot(): string {
  return '[]';
}

export default function EventoFavorito({ eventId }: EventoFavoritoProps) {
  const rawFavorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getFavoritesServerSnapshot
  );

  let favoritesList: string[] = [];
  try {
    favoritesList = JSON.parse(rawFavorites);
  } catch {
    favoritesList = [];
  }

  const isFavorited = favoritesList.includes(eventId);

  const toggleFavorite = () => {
    const nextFavorites = isFavorited
      ? favoritesList.filter((id) => id !== eventId)
      : [...favoritesList, eventId];

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
      window.dispatchEvent(new Event('mareln_favorites_updated'));
    } catch {
      console.error('Erro ao salvar favorito.');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorited
          ? 'Remover evento dos favoritos'
          : 'Adicionar evento aos favoritos'
      }
      aria-pressed={isFavorited}
      className={`
        group relative flex items-center gap-2
        rounded-xl px-5 py-3
        font-semibold
        transition-[background-color,color,box-shadow,transform]
        duration-300 ease-out
        active:scale-[0.97]
        ${
          isFavorited
            ? `
              bg-[#5B8DEF] text-white
              shadow-lg shadow-[#5B8DEF]/25
            `
            : `
              bg-white text-[#26364A]
              border border-slate-200
              hover:border-[#8CC8E8]
              hover:bg-[#EAF4FC]
              hover:text-[#5B8DEF]
            `
        }
      `}
    >
      {/* Área do coração */}
      <span className="relative flex h-6 w-6 items-center justify-center">
        {/* Contorno */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`
            absolute h-6 w-6
            transition-all duration-300 ease-out
            ${
              isFavorited
                ? 'scale-[0.82] opacity-40'
                : 'scale-100 opacity-100'
            }
          `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
          />
        </svg>

        {/* Preenchimento */}
        <svg
          viewBox="0 0 24 24"
          className={`
            absolute h-6 w-6
            fill-current
            transition-all
            duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              isFavorited
                ? 'scale-100 opacity-100'
                : 'scale-[0.75] opacity-0'
            }
          `}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>

        {/* Pequena onda de impacto */}
        <span
          className={`
            pointer-events-none absolute
            h-7 w-7 rounded-full
            border border-white/40
            transition-all
            duration-500
            ease-out
            ${
              isFavorited
                ? 'scale-150 opacity-0'
                : 'scale-50 opacity-0'
            }
          `}
        />
      </span>

      {/* Texto */}
      <span>
        {isFavorited ? 'Favoritado' : 'Favoritar Evento'}
      </span>
    </button>
  );
}
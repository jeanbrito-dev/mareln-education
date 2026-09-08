// app/components/EventoFavorito.tsx
'use client';

import { useEffect, useState } from 'react';

interface EventoFavoritoProps {
  eventId: string;
}

const FAVORITES_KEY = 'mareln_favorites';

export default function EventoFavorito({ eventId }: EventoFavoritoProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os favoritos salvos
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (stored) {
      try {
        const favorites: string[] = JSON.parse(stored);
        setIsFavorited(favorites.includes(eventId));
      } catch {
        console.error('Erro ao carregar favoritos.');
      }
    }

    setIsLoaded(true);
  }, [eventId]);

  // Salva os favoritos
  useEffect(() => {
    if (!isLoaded) return;

    const stored = localStorage.getItem(FAVORITES_KEY);

    let favorites: string[] = [];

    if (stored) {
      try {
        favorites = JSON.parse(stored);
      } catch {
        favorites = [];
      }
    }

    const updatedFavorites = isFavorited
      ? Array.from(new Set([...favorites, eventId]))
      : favorites.filter((id) => id !== eventId);

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );
  }, [isFavorited, eventId, isLoaded]);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
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
              bg-indigo-600 text-white
              shadow-lg shadow-indigo-600/20
            `
            : `
              bg-white text-slate-700
              border border-slate-200
              hover:border-indigo-300
              hover:bg-indigo-50
              hover:text-indigo-600
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
      <span
        className={`
          transition-[transform,opacity]
          duration-300 ease-out
          ${
            isFavorited
              ? 'translate-x-0'
              : 'translate-x-0'
          }
        `}
      >
        {isFavorited ? 'Favoritado' : 'Favoritar Evento'}
      </span>
    </button>
  );
}
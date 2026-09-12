'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ItemDados } from '../dados';

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

interface FavoritosClientProps {
  todosEventos: ItemDados[];
}

export default function FavoritosClient({ todosEventos }: FavoritosClientProps) {
  const rawFavorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getFavoritesServerSnapshot
  );

  let favoriteIds: string[] = [];
  try {
    favoriteIds = JSON.parse(rawFavorites);
  } catch {
    favoriteIds = [];
  }

  const favoritos = todosEventos.filter((item) =>
    favoriteIds.includes(item.id)
  );

  const removerFavorito = (id: string) => {
    const nextFavorites = favoriteIds.filter((favId) => favId !== id);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
      window.dispatchEvent(new Event('mareln_favorites_updated'));
    } catch {
      console.error('Erro ao remover favorito.');
    }
  };

  return (
    <div className="space-y-10">
      {/* Estado vazio */}
      {favoritos.length === 0 ? (
        <div className="text-center py-20 space-y-4 bg-white rounded-3xl p-8 border border-[#CFE2F5] shadow-[0_4px_20px_rgba(38,54,74,0.06)]">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF4FC] text-[#5B8DEF] flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-[#26364A] font-bold text-xl">
            Nenhum evento favoritado ainda
          </h2>
          <p className="text-[#718096] text-sm max-w-md mx-auto leading-relaxed">
            Navegue pelos eventos escolares e culturais do Litoral Norte e clique em{' '}
            <strong>Favoritar Evento</strong> para acompanhá-los facilmente por aqui.
          </p>
          <Link
            href="/"
            className="inline-block clay-button font-bold px-8 py-3.5 rounded-xl text-sm mt-4 shadow-md"
          >
            Explorar todos os eventos
          </Link>
        </div>
      ) : (
        /* Grid de favoritos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritos.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)] hover:shadow-[0_12px_32px_rgba(38,54,74,0.12)] hover:border-[#5B8DEF]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#26364A]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg border border-white/20 shadow-sm">
                    {item.categoria}
                  </div>
                  {item.cidade && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#26364A] text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm border border-slate-200/80 flex items-center gap-1">
                      <svg className="w-3 h-3 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{item.cidade}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 pb-0 space-y-3">
                  {item.data && (
                    <span className="text-xs font-bold text-[#5B8DEF] flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{item.data} {item.horario ? `• ${item.horario}` : ''}</span>
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#26364A] leading-snug group-hover:text-[#5B8DEF] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-[#718096] line-clamp-3 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-2">
                <Link
                  href={`/evento/${item.id}`}
                  className="block text-center w-full clay-button-white font-semibold py-2.5 rounded-xl transition-all text-sm"
                >
                  Ver Detalhes
                </Link>
                <button
                  type="button"
                  onClick={() => removerFavorito(item.id)}
                  className="block text-center w-full bg-red-50 text-red-500 hover:bg-red-100 font-semibold py-2.5 rounded-xl transition-all text-xs border border-red-200"
                >
                  Remover dos Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

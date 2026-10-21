'use client';

import { dadosFicticios, ItemDados } from '../dados';
import Link from 'next/link';
import { useAuth } from '../components/AuthProvider';
import { useFavorites } from '../hooks/useFavorites';

export default function FavoritosPage() {
  const { isAuthenticated, isReady } = useAuth();
  const { favorites: favoriteIds, removeFavorite } = useFavorites();
  const favoritos: ItemDados[] = dadosFicticios.filter((item) => favoriteIds.includes(item.id));

  const removerFavorito = (id: string) => {
    removeFavorite(id);
  };

  if (!isReady) {
    return (
      <div className="py-20 text-center">
        <p className="text-[#718096]">Carregando favoritos...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF4FC] text-3xl" aria-hidden="true">
          🔒
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#26364A]">Entre para ver seus favoritos</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#718096]">
          Você pode explorar o portal como anônimo, mas precisa de uma conta para salvar e organizar eventos.
        </p>
        <Link href="/login?reason=auth&next=/favoritos" className="clay-button mt-7 rounded-xl px-8 py-3 text-sm font-bold">
          Fazer login
        </Link>
      </section>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Cabeçalho da página */}
      <div className="space-y-2 border-b border-[#DCEEFF] pb-6">
        <span className="text-xs font-bold text-[#5B8DEF] uppercase tracking-wider">
          Minha Lista
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#26364A] tracking-tight">
          Eventos Favoritos
        </h1>
        <p className="text-[#718096] text-sm">
          {favoritos.length > 0
            ? `Você salvou ${favoritos.length} evento${favoritos.length > 1 ? 's' : ''}.`
            : 'Você ainda não salvou nenhum evento.'}
        </p>
      </div>

      {/* Estado vazio */}
      {favoritos.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🌊</div>
          <p className="text-[#26364A] font-semibold text-lg">
            Nenhum favorito ainda!
          </p>
          <p className="text-[#718096] text-sm">
            Navegue pelos eventos e clique em{' '}
            <strong>Favoritar Evento</strong> para salvá-los aqui.
          </p>
          <Link
            href="/portal"
            className="inline-block clay-button font-bold px-8 py-3 rounded-xl text-sm mt-4"
          >
            Ver todos os eventos
          </Link>
        </div>
      )}

      {/* Grid de favoritos */}
      {favoritos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritos.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DCEEFF] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#26364A]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg border border-white/20">
                    {item.categoria}
                  </div>
                </div>

                <div className="p-6 pb-0 space-y-3">
                  <h2 className="text-xl font-bold text-[#26364A] leading-snug">
                    {item.titulo}
                  </h2>
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
                  onClick={() => removerFavorito(item.id)}
                  className="block text-center w-full bg-red-50 text-red-500 hover:bg-red-100 font-semibold py-2.5 rounded-xl transition-all text-sm border border-red-200"
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

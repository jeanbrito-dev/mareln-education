import { Metadata } from 'next';
import { getEventos } from '../lib/db';
import FavoritosClient from './FavoritosClient';

export const metadata: Metadata = {
  title: 'Eventos Favoritos | MaréLN',
  description: 'Seus eventos escolares e culturais favoritados no portal MaréLN.',
};

export default async function FavoritosPage() {
  const eventos = await getEventos({ status: 'todos' });

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
          Acompanhe todos os eventos que você salvou no portal para fácil acesso.
        </p>
      </div>

      {/* Conteúdo Dinâmico */}
      <FavoritosClient todosEventos={eventos} />
    </div>
  );
}

import Link from "next/link";
import { Metadata } from "next";
import { getEventoById, getGremioById } from "../../lib/db";
import EventoFavorito from "../../components/EventoFavorito";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getEventoById(id);

  return {
    title: item ? `${item.titulo} | MaréLN` : "Evento Não Encontrado",
    description: item ? item.descricao : "Explore nosso portal de eventos e comunidade do Litoral Norte.",
    openGraph: {
      title: item?.titulo,
      description: item?.descricao,
      url: `https://mareln-education.vercel.app/evento/${id}`,
      images: [{ url: item?.imagem || "" }],
    },
  };
}

export default async function DetalheEvento({ params }: PageProps) {
  const { id } = await params;
  const evento = await getEventoById(id);

  if (!evento) {
    return (
      <div className="py-20 text-center space-y-4 px-4">
        <div className="w-14 h-14 rounded-2xl bg-[#EAF4FC] text-[#5B8DEF] flex items-center justify-center mx-auto">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#26364A]">Evento não encontrado</h1>
        <p className="text-sm text-[#718096]">Este evento pode ter sido removido ou o link está incorreto.</p>
        <Link href="/" className="inline-block clay-button font-bold px-6 py-2.5 rounded-xl text-xs">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const gremio = evento.gremioId ? await getGremioById(evento.gremioId) : null;

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Link de retorno */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B8DEF] hover:text-[#7C83E8] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Voltar para todos os eventos</span>
      </Link>

      {/* Cartão de Detalhes Dinâmico */}
      <div className="bg-white rounded-3xl overflow-hidden border border-[#CFE2F5] shadow-[0_4px_24px_rgba(38,54,74,0.06)] p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#5B8DEF] uppercase font-bold tracking-wider bg-[#EAF4FC] px-3 py-1 rounded-md">
            {evento.categoria}
          </span>
          {evento.cidade && (
            <span className="text-xs text-[#718096] font-semibold bg-[#F5F9FC] px-3 py-1 rounded-md border border-slate-200 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{evento.cidade}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#26364A] leading-tight">
          {evento.titulo}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <EventoFavorito eventId={evento.id} />
        </div>

        {/* Metadados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#718096] bg-[#F5F9FC] p-4 rounded-xl border border-slate-200/80">
          {evento.data && (
            <div>
              <strong className="text-[#26364A]">Data:</strong> {evento.data} {evento.horario ? `às ${evento.horario}` : ''}
            </div>
          )}
          {evento.local && (
            <div>
              <strong className="text-[#26364A]">Local:</strong> {evento.local}
            </div>
          )}
          {evento.autor && (
            <div>
              <strong className="text-[#26364A]">Organização:</strong> {evento.autor}
            </div>
          )}
          {evento.contato && (
            <div>
              <strong className="text-[#26364A]">Contato:</strong> {evento.contato}
            </div>
          )}
        </div>

        {/* Grêmio Parceiro Vinculado */}
        {gremio && (
          <div className="p-4 rounded-xl bg-[#EAF4FC]/60 border border-[#CFE2F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase text-[#5B8DEF] tracking-wider block">
                Iniciativa vinculada ao Grêmio:
              </span>
              <strong className="text-[#26364A] text-sm block">{gremio.nome} — {gremio.escola}</strong>
            </div>
            <Link
              href="/gremios"
              className="text-xs font-bold text-[#5B8DEF] hover:underline shrink-0"
            >
              Ver perfil do Grêmio →
            </Link>
          </div>
        )}

        {/* Imagem */}
        <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60">
          <img
            src={evento.imagem}
            alt={evento.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Descrição */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#26364A]">Sobre este evento:</h3>
          <p className="text-[#26364A] text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {evento.descricao}
          </p>
        </div>

        {evento.preco && (
          <div className="text-2xl font-black text-[#26364A] pt-4">
            R$ {evento.preco.toFixed(2)}
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto text-center clay-button font-bold px-8 py-3 rounded-xl text-sm transition-all shadow"
          >
            Voltar para todos os eventos
          </Link>

          <Link
            href="/divulgar-evento"
            className="text-xs font-semibold text-[#5B8DEF] hover:text-[#7C83E8] transition-colors text-center"
          >
            Quer divulgar um evento semelhante? Clique aqui
          </Link>
        </div>
      </div>
    </article>
  );
}

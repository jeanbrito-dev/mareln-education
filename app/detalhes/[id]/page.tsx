import { dadosFicticios } from "../../dados";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

// MÓDULO 4: METADADOS DINÂMICOS & MARKETING EM REDES (Semana 2)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = dadosFicticios.find((p) => p.id === id);

  return {
    title: item ? `${item.categoria.toUpperCase()} - ${item.titulo}` : "Item Não Encontrado",
    description: item ? item.descricao : "Explore nosso portal técnico de mídia e projetos em Next.js.",
    openGraph: {
      title: item?.titulo,
      description: item?.descricao,
      images: [{ url: item?.imagem || "" }],
    },
  };
}

// MÓDULO 2 & 3: ROTEAMENTO DINÂMICO (Semana 2)
export default async function DetalheNoticia({ params }: PageProps) {
  const { id } = await params;
  const noticia = dadosFicticios.find((item) => item.id === id);

  if (!noticia) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#26364A]">Artigo ou matéria não encontrada!</h1>
        <Link href="/" className="inline-block text-[#5B8DEF] font-bold underline">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

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
        <span>← Voltar para todos os artigos</span>
      </Link>

      {/* Cartão de Detalhes Dinâmico */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DCEEFF] p-6 sm:p-10 space-y-6">
        <span className="text-xs text-[#5B8DEF] uppercase font-bold tracking-wider">
          {noticia.categoria}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#26364A] leading-tight">
          {noticia.titulo}
        </h1>

        <div className="flex items-center gap-4 text-sm text-[#718096] border-y border-slate-100 py-3">
          {noticia.autor && (
            <span>Escrito por: <strong className="text-[#26364A]">{noticia.autor}</strong></span>
          )}
          <span>•</span>
          <span>Atualizado em: {new Date().toLocaleDateString("pt-BR")}</span>
        </div>

        <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-100">
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-[#26364A] text-lg leading-relaxed whitespace-pre-line">
          {noticia.descricao}
        </p>

        {noticia.preco && (
          <div className="text-2xl font-black text-[#26364A] pt-4">
            R$ {noticia.preco.toFixed(2)}
          </div>
        )}

        {noticia.contato && (
          <div className="text-sm font-semibold text-[#5B8DEF] pt-2">
            Contato: {noticia.contato}
          </div>
        )}

        <div className="pt-6 border-t border-slate-100">
          <Link
            href="/"
            className="inline-block clay-button font-bold px-8 py-3 rounded-xl text-sm transition-all shadow"
          >
            ← Voltar para todos os artigos
          </Link>
        </div>
      </div>
    </article>
  );
}

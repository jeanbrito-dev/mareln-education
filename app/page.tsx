import Link from "next/link";
import Logo from "./components/Logo";
import { getEventos, getGremios } from "./lib/db";
import GremioCard from "./components/GremioCard";

export default async function Home() {
  const [eventos, gremios] = await Promise.all([
    getEventos({ status: "aprovado" }),
    getGremios(),
  ]);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Banner MaréLN Educa+ */}
      <section
        className="relative min-h-[480px] sm:min-h-[580px] flex items-center justify-center text-center text-white px-4 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(38, 54, 74, 0.65), rgba(38, 54, 74, 0.85)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-3xl mx-auto z-10 pt-10 pb-20 sm:pb-24 space-y-6 flex flex-col items-center">
          <Logo variant="vertical" theme="light" size="lg" />

          <p className="text-base sm:text-xl text-white/95 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
            Portal de notícias, eventos escolares, tecnologia e comunidade dos estudantes do Litoral Norte.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#destaques"
              className="w-full sm:w-auto clay-button-white font-bold px-8 py-3.5 rounded-xl text-base shadow-lg"
            >
              Explorar eventos
            </a>
            <Link
              href="/divulgar-evento"
              className="w-full sm:w-auto clay-button font-semibold px-8 py-3.5 rounded-xl text-base shadow-lg"
            >
              Divulgar um evento
            </Link>
          </div>
        </div>

        {/* Divisor de Onda Litorânea */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg
            className="relative block w-full h-10 sm:h-20 text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Grid de Propostas & Eventos em Destaque */}
      <section id="destaques" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-light-blue pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Mídia &amp; Comunidade
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Eventos &amp; Propostas em Destaque
            </h2>
          </div>
          <Link
            href="/divulgar-evento"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors"
          >
            <span>Propor novo evento</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Vitrine em Grid do Tailwind CSS */}
        {eventos.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-light-blue shadow-[0_4px_16px_rgba(38,54,74,0.06)] space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-soft-blue text-primary flex items-center justify-center mx-auto">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Nenhum evento publicado no momento</h3>
            <p className="text-xs text-gray max-w-sm mx-auto">Seja o primeiro a enviar uma proposta de evento escolar para moderação!</p>
            <Link
              href="/divulgar-evento"
              className="inline-block clay-button font-bold px-6 py-2.5 rounded-xl text-xs mt-2"
            >
              Divulgar Evento
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {eventos.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-primary/50 shadow-[0_4px_8px_rgba(38,54,74,0.08)] hover:shadow-[0_12px_32px_rgba(38,54,74,0.12)] hover:border-primary/70 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                    <div className="absolute top-3 left-3 bg-foreground/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg border border-white/20 shadow-sm">
                      {item.categoria}
                    </div>

                    {item.cidade && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm border border-slate-200/80 flex items-center gap-1">
                        <svg className="w-3 h-3 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{item.cidade}</span>
                      </div>
                    )}
                  </div>

                  <div className="px-6 space-y-3">
                    {item.data && (
                      <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{item.data} {item.horario ? `• ${item.horario}` : ""}</span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {item.titulo}
                    </h3>

                    <p className="text-sm text-gray line-clamp-3 leading-relaxed">
                      {item.descricao}
                    </p>

                    {item.contato && (
                      <div className="text-xs font-semibold text-primary pt-1">
                        Contato: {item.contato}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <Link
                    href={`/evento/${item.id}`}
                    className="block text-center w-full clay-button-white font-semibold py-2.5 rounded-xl text-sm"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seção Integrada de Grêmios Estudantis */}
      <section className="py-14 sm:py-16 bg-soft-blue border-y border-light-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Voz Estudantil &amp; Liderança
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Grêmios Estudantis do Litoral Norte
              </h2>
              <p className="text-sm text-gray max-w-2xl">
                Conheça as diretorias e os projetos liderados por alunos nas escolas de Caraguatatuba, Ilhabela, São Sebastião e Ubatuba.
              </p>
            </div>
            <Link
              href="/gremios"
              className="clay-button font-bold text-xs px-6 py-3 rounded-xl shrink-0 text-center shadow-xs flex items-center justify-center gap-2"
            >
              <span>Ver todos os Grêmios</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {gremios.slice(0, 4).map((gremio) => (
              <GremioCard key={gremio.id} gremio={gremio} />
            ))}
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary text-white p-8 sm:p-14 text-center shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Quer divulgar um evento ou matéria no portal?
          </h2>

          <p className="text-base sm:text-lg text-light-blue max-w-2xl mx-auto font-medium">
            Envie a proposta do seu clube, grêmio, torneio ou projeto escolar diretamente para a moderação do MaréLN.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/divulgar-evento"
              className="w-full sm:w-auto inline-block clay-button-white font-bold px-10 py-4 rounded-xl text-base shadow-md"
            >
              Divulgar Evento
            </Link>
            <Link
              href="/contato"
              className="w-full sm:w-auto inline-block bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-4 rounded-xl text-base border border-white/30 transition-all duration-200 ease-out"
            >
              Falar com a redação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
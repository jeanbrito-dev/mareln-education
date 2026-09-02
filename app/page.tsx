import { dadosFicticios } from "./dados";
import Link from "next/link";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Banner MaréLN Educa+ */}
      <section
        className="relative min-h-[520px] sm:min-h-[580px] flex items-center justify-center text-center text-white px-4 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(38, 54, 74, 0.65), rgba(38, 54, 74, 0.85)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="max-w-3xl mx-auto z-10 pt-10 pb-24 space-y-6 flex flex-col items-center">
          <Logo variant="vertical" theme="light" size="lg" />

          <p className="text-base sm:text-xl text-[#F5F9FC]/95 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
            Portal de notícias, eventos escolares, tecnologia e comunidade dos estudantes do Litoral Norte.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#destaques"
              className="w-full sm:w-auto clay-button-white font-bold px-8 py-3.5 rounded-xl text-base shadow-lg transition-all"
            >
              Explorar notícias
            </a>
            <Link
              href="/contato"
              className="w-full sm:w-auto clay-button font-semibold px-8 py-3.5 rounded-xl text-base shadow-lg transition-all"
            >
              Falar com a redação
            </Link>
          </div>
        </div>

        {/* Divisor de Onda Litorânea */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg
            className="relative block w-full h-12 sm:h-20 text-[#F5F9FC]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Grid de Propostas & Notícias em Destaque */}
      <section id="destaques" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-2 border-b border-[#DCEEFF] pb-6">
          <span className="text-xs font-bold text-[#5B8DEF]">
            Mídia & Comunidade
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26364A] tracking-tight">
            Nossas Propostas em Destaque
          </h2>
        </div>

        {/* Vitrine em Grid do Tailwind CSS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dadosFicticios.map((item) => (
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

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-[#26364A] leading-snug">
                    {item.titulo}
                  </h3>

                  <p className="text-sm text-[#718096] line-clamp-3 leading-relaxed">
                    {item.descricao}
                  </p>

                  {item.autor && (
                    <div className="text-xs font-medium text-[#718096]">
                      Publicado por: <strong className="text-[#26364A]">{item.autor}</strong>
                    </div>
                  )}

                  {item.preco && (
                    <div className="text-lg font-black text-[#26364A]">
                      R$ {item.preco.toFixed(2)}
                    </div>
                  )}

                  {item.contato && (
                    <div className="text-xs font-semibold text-[#5B8DEF]">
                      Contato: {item.contato}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/detalhes/${item.id}`}
                  className="block text-center w-full clay-button-white font-semibold py-2.5 rounded-xl transition-all text-sm"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-[#5B8DEF] to-[#7C83E8] text-white p-8 sm:p-14 text-center shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quer publicar uma matéria no portal?
          </h2>

          <p className="text-base sm:text-lg text-[#DCEEFF] max-w-2xl mx-auto font-medium">
            Envie a sugestão de reportagem ou evento do seu grupo diretamente para a equipe de redação do MaréLN Educa+.
          </p>

          <div className="pt-2">
            <Link
              href="/contato"
              className="inline-block clay-button-white font-bold px-10 py-4 rounded-xl text-base shadow-md transition-all"
            >
              Enviar Mensagem
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

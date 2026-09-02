import Link from "next/link";
import Logo from "../components/Logo";

export default function Sobre() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 flex flex-col items-center">
        <Logo variant="horizontal" theme="dark" size="lg" />
        <p className="text-base text-[#718096] max-w-xl mx-auto">
          Iniciativa de mídia e comunidade desenvolvida pelos próprios estudantes do Ensino Técnico.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-[#DCEEFF] space-y-6">
        <p className="text-lg text-[#26364A] leading-relaxed">
          O <strong className="text-[#5B8DEF]">Maré LN Educa+</strong> nasceu como um projeto prático para integrar a comunidade escolar, dando voz aos grêmios estudantis, clubes de tecnologia, e-sports, literatura e ecologia.
        </p>

        <p className="text-[#718096] leading-relaxed">
          Nosso objetivo é proporcionar um portal de mídia dinâmico e reativo onde os alunos possam publicar reportagens, gerenciar campeonatos e interagir diretamente por comentários e curtidas.
        </p>

        <div className="py-6 border-y border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-xl bg-[#F5F9FC]">
            <span className="text-3xl font-extrabold text-[#5B8DEF]">100%</span>
            <p className="text-xs text-[#718096] font-medium mt-1">Produção Estudantil</p>
          </div>
          <div className="p-4 rounded-xl bg-[#EAF4FC]">
            <span className="text-3xl font-extrabold text-[#7C83E8]">+150</span>
            <p className="text-xs text-[#718096] font-medium mt-1">Alunos Engajados</p>
          </div>
          <div className="p-4 rounded-xl bg-[#EAE9FA]">
            <span className="text-3xl font-extrabold text-[#5B8DEF]">4</span>
            <p className="text-xs text-[#718096] font-medium mt-1">Clubes Ativos</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/noticias"
            className="inline-block clay-button font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md"
          >
            Ver portal de notícias
          </Link>
        </div>
      </div>
    </div>
  );
}

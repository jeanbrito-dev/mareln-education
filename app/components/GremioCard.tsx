import Link from 'next/link';
import { GremioEstudantil } from '../dados';

interface GremioCardProps {
  gremio: GremioEstudantil;
  totalEventos?: number;
}

export default function GremioCard({ gremio, totalEventos }: GremioCardProps) {
  return (
    <div className="bg-[#EAF4FC] rounded-2xl overflow-hidden border border-primary/40 shadow-[0_4px_8px_rgba(38,54,74,0.08)] hover:shadow-[0_12px_32px_rgba(38,54,74,0.12)] hover:border-[#5B8DEF]/70 transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Banner/Imagem do Grêmio */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={gremio.imagem}
            alt={gremio.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26364A]/60 via-transparent to-transparent opacity-60" />

          {/* Badge Cidade com Ícone SVG */}
          <div className="absolute top-3 left-3 bg-[#26364A]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-sm">
            <svg className="w-3.5 h-3.5 text-[#8CC8E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{gremio.cidade}</span>
          </div>
        </div>

        {/* Informações Principais */}
        <div className="p-6 pb-2 space-y-3">
          <div>
            <span className="text-xs font-bold text-[#5B8DEF] uppercase tracking-wider block">
              {gremio.escola}
            </span>
            <h3 className="text-xl font-extrabold text-[#26364A] leading-snug mt-1 group-hover:text-[#5B8DEF] transition-colors">
              {gremio.nome}
            </h3>
          </div>

          <p className="text-sm text-[#718096] line-clamp-3 leading-relaxed">
            {gremio.descricao}
          </p>

          {/* Destaques / Projetos */}
          {gremio.projetosPrincipais && gremio.projetosPrincipais.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-[#26364A] block mb-1.5">
                Projetos & Ações:
              </span>
              <ul className="space-y-1">
                {gremio.projetosPrincipais.slice(0, 2).map((proj, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[#718096] flex items-center gap-2 line-clamp-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B8DEF] shrink-0" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadados: Presidente e Membros */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-[#718096] gap-2">
            <div>
              <span>Presidência: </span>
              <strong className="text-[#26364A] font-semibold">{gremio.presidente}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé do Card com Ações */}
      <div className="p-6 pt-3 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-[#718096] pt-1">
          {gremio.instagram && (
            <span className="font-semibold text-[#5B8DEF] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" />
              </svg>
              <span>{gremio.instagram}</span>
            </span>
          )}
          {typeof totalEventos === 'number' && totalEventos > 0 && (
            <span className="font-bold text-[#7C83E8]">
              {totalEventos} evento{totalEventos > 1 ? 's' : ''} ativo{totalEventos > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <Link
          href={`/divulgar-evento?gremio=${gremio.id}`}
          className="block text-center w-full py-2.5 px-4 rounded-xl border border-[#CFE2F5] bg-[#F5F9FC] hover:bg-[#EAF4FC] hover:border-[#5B8DEF]/40 text-[#5B8DEF] font-bold text-xs transition-all shadow-2xs"
        >
          Propor evento com este Grêmio
        </Link>
      </div>
    </div>
  );
}

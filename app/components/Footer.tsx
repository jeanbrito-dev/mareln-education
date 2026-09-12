import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#26364A] text-white pt-16 pb-8 border-t border-[#5B8DEF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Marca com Logo */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <Logo variant="horizontal" theme="light" size="md" />
            </Link>
            <p className="text-sm text-[#DCEEFF]/70 leading-relaxed max-w-sm">
              O portal de descoberta, eventos escolares, cultura jovem e liderança estudantil do Litoral Norte de São Paulo.
            </p>
          </div>

          {/* Links de Navegação */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DCEEFF]/80">
              <li>
                <Link href="/" className="hover:text-[#8CC8E8] transition-colors">Início</Link>
              </li>
              <li>
                <Link href="/gremios" className="hover:text-[#8CC8E8] transition-colors">Grêmios Estudantis</Link>
              </li>
              <li>
                <Link href="/divulgar-evento" className="hover:text-[#8CC8E8] transition-colors">Divulgar Evento</Link>
              </li>
              <li>
                <Link href="/favoritos" className="hover:text-[#8CC8E8] transition-colors">Favoritos</Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-[#8CC8E8] transition-colors">Quem Somos</Link>
              </li>
            </ul>
          </div>

          {/* Gestão & Contato */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Comunidade
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DCEEFF]/80">
              <li>
                <Link href="/contato" className="hover:text-[#8CC8E8] transition-colors">Fale com a Redação</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#8CC8E8] transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c-1.657 0-3 .895-3 2v2h6v-2c0-1.105-1.343-2-3-2z" /><rect width="18" height="12" x="3" y="9" rx="2" ry="2" stroke="currentColor" strokeWidth={2} fill="none" /></svg>
                  <span>Acesso Administrativo</span>
                </Link>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#5B8DEF] flex items-center justify-center transition-colors text-white"
                  aria-label="Instagram da Escola"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#5B8DEF] flex items-center justify-center transition-colors text-white"
                  aria-label="Canal no YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Direitos */}
        <div className="pt-8 text-center text-xs text-[#DCEEFF]/50">
          <p>© {new Date().getFullYear()} Maré LN Educa+ | Desenvolvido no Curso Técnico em Informática.</p>
        </div>
      </div>
    </footer>
  );
}

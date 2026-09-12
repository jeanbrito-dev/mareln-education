"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary backdrop-blur-md border-b border-[#5B8DEF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo Oficial Maré LN Educa+ */}
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <Logo variant="horizontal" theme="light" size="md" />
        </Link>

        {/* Links de Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-background">
          <Link href="/" className="hover:text-[#8CC8E8] transition-colors py-1">
            Início
          </Link>
          <Link href="/gremios" className="hover:text-[#8CC8E8] transition-colors py-1">
            Grêmios
          </Link>
          <Link href="/divulgar-evento" className="hover:text-[#8CC8E8] transition-colors py-1">
            Divulgar Evento
          </Link>
          <Link href="/favoritos" className="hover:text-[#8CC8E8] transition-colors py-1">
            Favoritos
          </Link>
          <Link href="/sobre" className="hover:text-[#8CC8E8] transition-colors py-1">
            Quem Somos
          </Link>
          <Link href="/contato" className="hover:text-[#8CC8E8] transition-colors py-1">
            Contato
          </Link>
        </nav>

        {/* Botão de Ação CTA Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/divulgar-evento"
            className="clay-button-white font-semibold"
          >
            Divulgar Evento
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile — animação nas barrinhas */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
          aria-expanded={mobileMenuOpen}
        >
          {/* Barra superior */}
          <span
            className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-y-[6px] rotate-45" : "-translate-y-[4px]"
            }`}
          />
          {/* Barra do meio */}
          <span
            className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          {/* Barra inferior */}
          <span
            className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : "translate-y-[4px]"
            }`}
          />
        </button>
      </div>

      {/* Menu Mobile com animação de slide */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#26364A] border-b border-[#5B8DEF]/20 px-4 pt-2 pb-6 space-y-1">
          {[
            { href: "/", label: "Início" },
            { href: "/gremios", label: "Grêmios Estudantis" },
            { href: "/divulgar-evento", label: "Divulgar Evento" },
            { href: "/favoritos", label: "Favoritos" },
            { href: "/sobre", label: "Quem Somos" },
            { href: "/contato", label: "Contato" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-white hover:text-[#8CC8E8] font-medium transition-colors"
            >
              {label}
            </Link>
          ))}

          <div className="pt-3 space-y-2">
            <Link
              href="/divulgar-evento"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full clay-button-white font-semibold py-2.5 rounded-xl text-sm"
            >
              Divulgar Evento
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full py-2 rounded-xl text-xs text-[#8CC8E8] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c-1.657 0-3 .895-3 2v2h6v-2c0-1.105-1.343-2-3-2z" /><rect width="18" height="12" x="3" y="9" rx="2" ry="2" stroke="currentColor" strokeWidth={2} fill="none" /></svg> Acesso Administrativo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
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
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
          <Link href="/" className="hover:text-[#8CC8E8] transition-colors py-1">
            Início
          </Link>
          <Link href="/sobre" className="hover:text-[#8CC8E8] transition-colors py-1">
            Quem Somos
          </Link>
          <Link href="/favoritos" className="hover:text-[#8CC8E8] transition-colors py-1">
            Favoritos
          </Link>
          <Link href="/contato" className="hover:text-[#8CC8E8] transition-colors py-1">
            Contato
          </Link>
        </nav>

        {/* Botão de Ação CTA Desktop */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contato"
            className="clay-button font-semibold px-5 py-2.5 rounded-xl text-sm"
          >
            Fazer contato
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile — animação nas barrinhas */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#26364A] border-b border-[#5B8DEF]/20 px-4 pt-2 pb-6 space-y-1">
          {[
            { href: "/", label: "Início" },
            { href: "/sobre", label: "Quem Somos" },
            { href: "/favoritos", label: "Favoritos" },
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

          <div className="pt-3">
            <Link
              href="/contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full clay-button font-semibold py-2.5 rounded-xl text-sm"
            >
              Fazer contato
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

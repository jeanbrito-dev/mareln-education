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

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
          <Link href="/" className="hover:text-[#8CC8E8] transition-colors py-1">
            Início
          </Link>
          <Link href="/sobre" className="hover:text-[#8CC8E8] transition-colors py-1">
            Quem Somos
          </Link>
          <Link href="/contato" className="hover:text-[#8CC8E8] transition-colors py-1">
            Contato
          </Link>
        </nav>

        {/* Botão de Ação CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contato"
            className="clay-button font-semibold px-5 py-2.5 rounded-xl text-sm"
          >
            Fazer contato
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          aria-label="Abrir menu de navegação"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#26364A] border-b border-[#5B8DEF]/20 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#8CC8E8] font-medium"
          >
            Início
          </Link>
          <Link
            href="/sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#8CC8E8] font-medium"
          >
            Quem Somos
          </Link>
          <Link
            href="/contato"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#8CC8E8] font-medium"
          >
            Contato
          </Link>
          <div className="pt-2">
            <Link
              href="/contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full clay-button font-semibold py-2.5 rounded-xl text-sm"
            >
              Fazer contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session, isReady, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-primary backdrop-blur-md border-b border-[#5B8DEF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo Oficial Maré LN Educa+ */}
        <Link href="/portal" className="hover:opacity-95 transition-opacity">
          <Logo variant="horizontal" theme="light" size="md" />
        </Link>

        {/* Links de Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/90">
          <Link href="/portal" className="hover:text-[#8CC8E8] transition-colors py-1">
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
          <Link href="/contato" className="hover:text-[#8CC8E8] transition-colors py-1">
            Contato
          </Link>
        </nav>

        {/* Botão de Ação CTA Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {isReady && session?.kind === "user" ? (
            <>
              <span className="max-w-36 truncate text-sm font-semibold text-white/85">
                Olá, {session.name?.split(" ")[0]}
              </span>
              <button onClick={logout} className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#315f9e] shadow-sm transition hover:bg-[#EAF4FC]">
              Entrar
            </Link>
          )}
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
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#26364A] border-b border-[#5B8DEF]/20 px-4 pt-2 pb-6 space-y-1">
          {[
            { href: "/portal", label: "Início" },
            { href: "/gremios", label: "Grêmios Estudantis" },
            { href: "/divulgar-evento", label: "Divulgar Evento" },
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
            {isReady && session?.kind === "user" ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-xl border border-white/30 py-2.5 text-sm font-semibold text-white"
              >
                Sair da conta
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-xl bg-white py-2.5 text-center text-sm font-bold text-[#315f9e]"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

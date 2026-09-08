import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | MaréLN",
  description:
    "A página que você procura não existe ou foi removida. Explore os eventos do Litoral Norte no MaréLN.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#F5F9FC] px-4 py-16 sm:px-6 lg:px-8">
      {/* Elementos decorativos de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#5B8DEF]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#8CC8E8]/20 blur-3xl"
      />

      {/* Pequenas ondas decorativas */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full opacity-40"
        viewBox="0 0 1440 180"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 110C180 50 300 145 480 100C660 55 760 30 920 90C1080 150 1230 55 1440 95V180H0V110Z"
          fill="#DCEEFF"
        />
        <path
          d="M0 140C190 80 340 170 530 125C720 80 830 65 1000 120C1170 175 1280 100 1440 125V180H0V140Z"
          fill="#EAF4FC"
        />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center">
        <div className="w-full text-center">
          {/* 404 */}
          <div className="relative mx-auto mb-7 w-fit select-none">
            <span
              className="block text-[8rem] font-black leading-[0.8] tracking-[-0.08em] sm:text-[11rem] md:text-[13rem]"
              style={{
                background:
                  "linear-gradient(135deg, #5B8DEF 0%, #7C83E8 48%, #8CC8E8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>

            {/* Linha de onda */}
            <svg
              aria-hidden="true"
              className="absolute -bottom-5 left-1/2 h-8 w-[85%] -translate-x-1/2 text-[#5B8DEF]/20"
              viewBox="0 0 400 30"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 15C45 2 78 2 120 15C162 28 195 28 238 15C280 2 320 2 398 15"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Card principal */}
          <div className="mx-auto max-w-xl rounded-3xl border border-white/80 bg-white/85 p-7 shadow-[0_20px_60px_rgba(91,141,239,0.10)] backdrop-blur-md sm:p-9 mt-15">

            <h1 className="text-2xl font-extrabold tracking-tight text-[#26364A] sm:text-3xl">
              Essa página saiu da rota.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#718096] sm:text-base">
              O endereço que você acessou não existe, foi alterado ou não está
              mais disponível. Mas ainda há muitos eventos esperando por você.
            </p>

            {/* Ações */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B8DEF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5B8DEF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4D7FE0] hover:shadow-xl hover:shadow-[#5B8DEF]/25 active:translate-y-0"
              >
                Ir para o início

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/favoritos"
                className="inline-flex items-center justify-center rounded-xl border border-[#DCEEFF] bg-[#F8FBFE] px-6 py-3.5 text-sm font-semibold text-[#26364A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFD8F5] hover:bg-[#EAF4FC] active:translate-y-0"
              >
                Meus favoritos
              </Link>
            </div>
          </div>

          {/* Links rápidos */}
          <nav
            aria-label="Links rápidos"
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#718096]"
          >
            <span className="font-semibold text-[#26364A]">
              Explore o MaréLN
            </span>

            <Link
              href="/"
              className="transition-colors duration-200 hover:text-[#5B8DEF]"
            >
              Início
            </Link>

            <span aria-hidden="true" className="text-[#CBD5E0]">
              /
            </span>

            <Link
              href="/sobre"
              className="transition-colors duration-200 hover:text-[#5B8DEF]"
            >
              Quem somos
            </Link>

            <span aria-hidden="true" className="text-[#CBD5E0]">
              /
            </span>

            <Link
              href="/contato"
              className="transition-colors duration-200 hover:text-[#5B8DEF]"
            >
              Contato
            </Link>

            <span aria-hidden="true" className="text-[#CBD5E0]">
              /
            </span>

            <Link
              href="/favoritos"
              className="transition-colors duration-200 hover:text-[#5B8DEF]"
            >
              Favoritos
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
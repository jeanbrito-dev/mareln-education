import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=85";

export default function WelcomePage() {
  return (
    <section
      className="welcome-hero relative isolate flex min-h-screen items-center overflow-hidden bg-[#26364A] px-5 py-12 text-white sm:px-10 lg:px-16"
      style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#12243d]/95 via-[#1d3552]/72 to-[#26364A]/20" />
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl space-y-7">
          <img
            src="/logo.png"
            alt="Símbolo da Maré LN"
            className="h-16 w-16 object-contain drop-shadow-lg sm:h-20 sm:w-20"
          />
          <h1 className="text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[6.75rem]">
            MaréLN <span className="text-[#8CC8E8]">Educa+</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/90 sm:text-2xl">
            Informação, educação e comunidade em uma só maré.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#5B8DEF] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#10243e]/30 transition hover:-translate-y-0.5 hover:bg-[#6b99f2] sm:w-auto"
            >
              Entrar ou criar conta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

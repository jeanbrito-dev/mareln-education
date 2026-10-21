"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { useAuth } from "../components/AuthProvider";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85";

type Mode = "login" | "register";

function subscribeToUrl() {
  return () => undefined;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, register, continueAsGuest } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const search = useSyncExternalStore(subscribeToUrl, () => window.location.search, () => "");
  const authNotice = new URLSearchParams(search).get("reason") === "auth"
    ? "Faça login ou crie uma conta para realizar essa ação."
    : "";
  const visibleMessage = message || authNotice;

  const goToPortal = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next?.startsWith("/") ? next : "/portal");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (mode === "register") {
      if (name.trim().length < 3) {
        setMessage("Digite um nome com pelo menos 3 letras.");
        return;
      }
      if (password.length < 6) {
        setMessage("A senha precisa ter pelo menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        setMessage("As senhas não são iguais.");
        return;
      }

      const error = register({ name: name.trim(), email: email.trim(), password });
      if (error) {
        setMessage(error);
        return;
      }
      goToPortal();
      return;
    }

    const error = login(email.trim(), password);
    if (error) {
      setMessage(error);
      return;
    }
    goToPortal();
  };

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    setMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleGuest = () => {
    continueAsGuest();
    router.push("/portal");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.09] md:hidden"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />

      <div className="relative grid min-h-screen md:grid-cols-[48%_52%]">
        <section
          aria-hidden="true"
          className="hidden bg-cover bg-center md:block"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#26364A] sm:text-4xl">
                MaréLN <span className="text-[#5B8DEF]">Educa+</span>
              </h1>
              <p className="text-sm leading-relaxed text-[#718096] sm:text-base">
                Informação, educação e comunidade em uma só maré.
              </p>
            </div>

            <div className="mb-7 grid grid-cols-2 border-b border-[#DCEEFF]" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => changeMode("login")}
                className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
                  mode === "login"
                    ? "border-[#5B8DEF] text-[#5B8DEF]"
                    : "border-transparent text-[#718096] hover:text-[#26364A]"
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "register"}
                onClick={() => changeMode("register")}
                className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
                  mode === "register"
                    ? "border-[#5B8DEF] text-[#5B8DEF]"
                    : "border-transparent text-[#718096] hover:text-[#26364A]"
                }`}
              >
                Criar conta
              </button>
            </div>

            {visibleMessage ? (
              <p role="alert" className="mb-5 rounded-xl border border-[#bfdcff] bg-[#eef7ff] px-4 py-3 text-sm font-medium text-[#315f9e]">
                {visibleMessage}
              </p>
            ) : null}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {mode === "register" ? (
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#26364A]">
                    Nome
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    minLength={3}
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    className="auth-input"
                  />
                </div>
              ) : null}

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#26364A]">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className="auth-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#26364A]">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={mode === "register" ? 6 : undefined}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="Sua senha"
                  className="auth-input"
                />
              </div>

              {mode === "register" ? (
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#26364A]">
                    Confirmar senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Digite a senha novamente"
                    className="auth-input"
                  />
                </div>
              ) : null}

              <button type="submit" className="clay-button w-full rounded-xl py-3.5 text-sm font-bold">
                {mode === "login" ? "Entrar" : "Criar minha conta"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs font-semibold text-[#8A98AA]">
              <span className="h-px flex-1 bg-[#DCEEFF]" />
              ou
              <span className="h-px flex-1 bg-[#DCEEFF]" />
            </div>

            <button
              type="button"
              onClick={handleGuest}
              className="w-full rounded-xl border border-[#BED3EA] bg-white/75 py-3.5 text-sm font-bold text-[#26364A] transition hover:border-[#5B8DEF] hover:bg-[#EAF4FC]"
            >
              Continuar como anônimo
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-[#718096]">
              Como anônimo você pode explorar, mas precisa entrar para favoritar ou enviar matérias.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

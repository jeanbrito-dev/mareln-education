'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminLoginAction } from '../../lib/actions';

export default function AdminLoginClient() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    setError(null);

    const formData = new FormData();
    formData.append('password', password);

    startTransition(async () => {
      const res = await adminLoginAction({}, formData);
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error || 'Credenciais inválidas.');
      }
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#CFE2F5] shadow-[0_8px_30px_rgba(38,54,74,0.08)] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#EAF4FC] text-[#5B8DEF] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#5B8DEF] uppercase tracking-wider block">
            Acesso Restrito
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26364A] tracking-tight">
            Painel Administrativo
          </h1>
          <p className="text-xs text-[#718096]">
            Área de moderação de eventos e gestão do portal MaréLN.
          </p>
        </div>

        {error && (
          <div
            className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold leading-relaxed"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-[#26364A]">
              Senha de Administrador
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha administrativa"
              className="w-full min-h-[48px] px-4 py-3 bg-[#F5F9FC] border border-slate-200 rounded-xl text-sm text-[#26364A] placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || !password}
            className="w-full clay-button font-bold py-3.5 rounded-xl transition-all text-sm shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Autenticando...</span>
              </>
            ) : (
              <span>Entrar no Painel</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-semibold text-[#5B8DEF] hover:text-[#7C83E8] transition-colors"
          >
            Voltar para o portal público
          </Link>
        </div>
      </div>
    </div>
  );
}

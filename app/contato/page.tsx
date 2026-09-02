"use client";

import { useState } from "react";

export default function Contato() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#5B8DEF]">
          Participação Estudantil
        </span>
        <h1 className="text-4xl font-extrabold text-[#26364A] tracking-tight">
          Enviar Matéria ou Contato
        </h1>
        <p className="text-[#718096] text-sm max-w-md mx-auto">
          Quer publicar uma notícia, anunciar um evento do seu clube ou falar com a redação? Envie sua sugestão abaixo.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-[#DCEEFF]">
        {enviado ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-[#EAF4FC] text-[#5B8DEF] rounded-xl flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-[#26364A]">Proposta enviada com sucesso!</h2>
            <p className="text-[#718096] text-sm max-w-sm mx-auto">
              Nossa equipe de redação analisará seu conteúdo e entrará em contato em breve.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="mt-4 clay-button font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
            >
              Enviar outra proposta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#26364A] mb-2">
                  Seu nome e turma
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João Santos (3º Ano)"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#26364A] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] bg-[#F5F9FC]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#26364A] mb-2">
                  E-mail de contato
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@escola.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#26364A] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] bg-[#F5F9FC]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#26364A] mb-2">
                Tipo de envio
              </label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#26364A] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] bg-[#F5F9FC]/50">
                <option>Notícia / Reportagem Escolar</option>
                <option>Anúncio de Torneio de E-Sports</option>
                <option>Inscrição de Novo Clube</option>
                <option>Sugestão ao Grêmio Estudantil</option>
                <option>Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#26364A] mb-2">
                Conteúdo da matéria ou mensagem
              </label>
              <textarea
                rows={5}
                required
                placeholder="Descreva o evento, notícia ou sugestão que você gostaria de publicar..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#26364A] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] bg-[#F5F9FC]/50"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full clay-button font-bold py-3.5 rounded-xl transition-all text-sm shadow-md"
            >
              Enviar proposta para publicação
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
